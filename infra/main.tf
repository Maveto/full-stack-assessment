terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.0"
    }

    mongodbatlas = {
      source  = "mongodb/mongodbatlas"
      version = "~> 1.16"
    }
  }
}

# PROVIDERS SETUP
provider "aws" {
  region = var.aws_region
}

provider "mongodbatlas" {
  public_key  = var.mongodbatlas_public_key
  private_key = var.mongodbatlas_private_key
}

# MongoDB Atlas Project
resource "mongodbatlas_project" "shop_project" {
  name   = "mauricio-shop"
  org_id = var.mongodbatlas_org_id
}

# MongoDB Atlas Cluster
resource "mongodbatlas_cluster" "shop_cluster" {
  project_id                  = mongodbatlas_project.shop_project.id
  name                        = "shop-cluster"
  provider_name               = "AWS"
  provider_instance_size_name = var.mongo_instace_size
  cluster_type                = "REPLICASET"
  num_shards                  = 1

  replication_specs {
    num_shards = 1

    regions_config {
      region_name     = var.mongo_region
      electable_nodes = 3
      priority        = 7
      read_only_nodes = 0
    }
  }

  backup_enabled = true
}

# MongoDB Atlas User
resource "mongodbatlas_database_user" "app_user" {
  username           = var.mongo_user
  password           = var.mongo_password
  project_id         = mongodbatlas_project.shop_project.id
  auth_database_name = "admin"

  roles {
    role_name     = "readWriteAnyDatabase"
    database_name = "admin"
  }
}

# Allow access from EC2
resource "mongodbatlas_project_ip_access_list" "allow_ec2" {
  project_id = mongodbatlas_project.shop_project.id
  ip_address = aws_instance.app_server.public_ip
  comment    = "Allow EC2 backend instance"
}

# VPC & NETWORKING
resource "aws_vpc" "main_vpc" {
  cidr_block           = "10.0.0.0/16"
  enable_dns_support   = true
  enable_dns_hostnames = true
  tags = {
    Name = "mauricio-vpc"
  }
}

# Public Subnet
resource "aws_subnet" "public_subnet" {
  vpc_id                  = aws_vpc.main_vpc.id
  cidr_block              = "10.0.1.0/24"
  availability_zone       = "us-east-1a"
  map_public_ip_on_launch = true
  tags = {
    Name = "public-subnet"
  }
}

# Private Subnet
resource "aws_subnet" "private_subnet" {
  vpc_id                  = aws_vpc.main_vpc.id
  cidr_block              = "10.0.2.0/24"
  availability_zone       = "us-east-1a"
  map_public_ip_on_launch = false
  tags = {
    Name = "private-subnet"
  }
}

# Internet Gateway for public subnets
resource "aws_internet_gateway" "gw" {
  vpc_id = aws_vpc.main_vpc.id
  tags = {
    Name = "mauricio-gw"
  }
}

# Elastic IP for NAT
resource "aws_eip" "nat_eip" {
  domain = "vpc"
}

# NAT Gateway for private subnet to access the internet
resource "aws_nat_gateway" "nat" {
  allocation_id = aws_eip.nat_eip.id
  subnet_id     = aws_subnet.public_subnet.id
  tags = {
    Name = "mauricio-nat-gateway"
  }
}

# Public Route Table
resource "aws_route_table" "public_rt" {
  vpc_id = aws_vpc.main_vpc.id
  route {
    cidr_block = "0.0.0.0/0"
    gateway_id = aws_internet_gateway.gw.id
  }
  tags = {
    Name = "public-route-table"
  }
}

resource "aws_route_table_association" "public_assoc" {
  subnet_id      = aws_subnet.public_subnet.id
  route_table_id = aws_route_table.public_rt.id
}

# Private Route Table
resource "aws_route_table" "private_rt" {
  vpc_id = aws_vpc.main_vpc.id
  route {
    cidr_block     = "0.0.0.0/0"
    nat_gateway_id = aws_nat_gateway.nat.id
  }
  tags = {
    Name = "private-route-table"
  }
}

resource "aws_route_table_association" "private_assoc" {
  subnet_id      = aws_subnet.private_subnet.id
  route_table_id = aws_route_table.private_rt.id
}

# IAM role for EC2
resource "aws_iam_role" "ec2_role" {
  name = "ec2-role"
  assume_role_policy = jsonencode({
    Version = "2012-10-17",
    Statement = [
      {
        Effect = "Allow",
        Principal = {
          Service = "ec2.amazonaws.com"
        },
        Action = "sts:AssumeRole"
      }
    ]
  })
}

# Allows EC2 instance to send logs to CloudWatch Logs
resource "aws_iam_role_policy_attachment" "cloudwatch_logs" {
  role       = aws_iam_role.ec2_role.name
  policy_arn = "arn:aws:iam::aws:policy/CloudWatchAgentServerPolicy"
}

# Allows EC2 instance to use AWS Systems Manager(SSM)
resource "aws_iam_role_policy_attachment" "ssm" {
  role       = aws_iam_role.ec2_role.name
  policy_arn = "arn:aws:iam::aws:policy/AmazonSSMManagedInstanceCore"
}

# Additional policy for access to SSM parameters
data "aws_caller_identity" "current" {}

resource "aws_iam_policy" "ssm_read_policy" {
  name        = "ssm-read-policy"
  description = "Allow EC2 to read SSM parameters"
  policy = jsonencode({
    Version = "2012-10-17",
    Statement = [
      {
        Effect   = "Allow"
        Action   = "ssm:GetParameter"
        Resource = "arn:aws:ssm:${var.aws_region}:${data.aws_caller_identity.current.account_id}:parameter/*"
      }
    ]
  })
}

# Attach the SSM read policy to the EC2 instance role
resource "aws_iam_role_policy_attachment" "ssm_read_policy_attachment" {
  role       = aws_iam_role.ec2_role.name
  policy_arn = aws_iam_policy.ssm_read_policy.arn
}

# Role Profile for EC2 instance
resource "aws_iam_instance_profile" "ec2_instance_profile" {
  name = "ec2-instance-profile"
  role = aws_iam_role.ec2_role.name
}

# SECURITY GROUPS
# SG for EC2
resource "aws_security_group" "ec2_sg" {
  name        = "ec2-sg"
  description = "Allow SSH and HTTP"
  vpc_id      = aws_vpc.main_vpc.id

  ingress {
    description = "Allows SSH access form specific IP"
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    cidr_blocks = [var.ssh_ip]
  }

  ingress {
    description = "Allows HTTP access"
    from_port   = 8080
    to_port     = 8080
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  egress {
    description = "Allows all egress trafic"
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }
}

# SG for RDS
resource "aws_security_group" "rds_sg" {
  name        = "rds-sg"
  description = "Allow PostgreSQL from EC2 only"
  vpc_id      = aws_vpc.main_vpc.id

  ingress {
    description     = "Allows access from EC2 Security Group"
    from_port       = 5432
    to_port         = 5432
    protocol        = "tcp"
    security_groups = [aws_security_group.ec2_sg.id]
  }

  egress {
    description = "Allows all egress trafic"
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }
}

# EC2 instance
resource "aws_instance" "app_server" {
  ami                         = var.ami_id
  instance_type               = var.instance_type
  subnet_id                   = aws_subnet.public_subnet.id
  vpc_security_group_ids      = [aws_security_group.ec2_sg.id]
  associate_public_ip_address = true

  iam_instance_profile = aws_iam_instance_profile.ec2_instance_profile.name

  tags = {
    Name = "mauricio-backend-ec2"
  }

  user_data = file("${path.module}/user_data.sh")
}

# RDS instance for PostgreSQL
resource "aws_db_instance" "postgres" {
  identifier              = "shop-postgres-db"
  engine                  = "postgres"
  engine_version          = "15.3"
  instance_class          = "db.t3.micro"
  allocated_storage       = 20
  storage_type            = "gp2"
  username                = var.db_username
  password                = var.db_password
  db_name                 = "shop"
  port                    = 5432
  publicly_accessible     = false
  vpc_security_group_ids  = [aws_security_group.rds_sg.id]
  db_subnet_group_name    = aws_db_subnet_group.default.name
  multi_az                = false
  backup_retention_period = 7
  skip_final_snapshot     = false

  tags = {
    Name = "shop-rds-postgres"
  }
}

resource "aws_db_subnet_group" "default" {
  name       = "shop-db-subnet-group"
  subnet_ids = [aws_subnet.private_subnet.id]
  tags = {
    Name = "shop-db-subnet-group"
  }
}
