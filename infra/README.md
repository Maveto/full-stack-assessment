# Infrastructure (Terraform)

This module defines and deploys the entire backend infrastructure for the **MauriShop** online store platform. It uses **Terraform** to provision cloud resources on **AWS** and **MongoDB Atlas**, forming a scalable and secure backend stack that powers the REST API, authentication, and data persistence layers of the project.

## Table of Contents
- [Infrastructure (Terraform)](#infrastructure-terraform)
  - [Table of Contents](#table-of-contents)
  - [Project Structure](#project-structure)
  - [Deployed Resources](#deployed-resources)
    - [🔌 Providers](#-providers)
    - [☁️ MongoDB Atlas](#️-mongodb-atlas)
    - [🌐 Networks \& Subnets (VPC)](#-networks--subnets-vpc)
    - [🔐 Security](#-security)
      - [Security Groups](#security-groups)
      - [IAM](#iam)
    - [🖥️ Instances](#️-instances)
      - [EC2 - Backend App](#ec2---backend-app)
      - [RDS - PostgreSQL](#rds---postgresql)
    - [🔐 AWS SSM Parameters (Secrets Manager)](#-aws-ssm-parameters-secrets-manager)
  - [Input Variables](#input-variables)
  - [Requirements](#requirements)
  - [Use](#use)
  - [Notes](#notes)
  - [Destruction of Infrastructure](#destruction-of-infrastructure)
  - [Security](#security)


## Project Structure
This project uses Terraform to provision a full-stack web application infrastructure on AWS, designed for scalability, security, and maintainability.

```
infra/
├── main.tf                     # Defines the main infrastructure resources 
├── ssm_parameters.tf           # Manages AWS SSM Parameter Store values
├── variables.tf                # Declares input variables
├── outputs.tf                  # Specifies output values
├── user_data.sh                # Startup script for EC2 instances
└── terraform.tfvars.example    # Example values file
```

## Deployed Resources

### 🔌 Providers

- **AWS** (v5.x)
- **MongoDB Atlas** (v1.16+)

### ☁️ MongoDB Atlas

- `mongodbatlas_project.shop_project`: MongoDB Atlas project named `mauricio-shop`.
- `mongodbatlas_cluster.shop_cluster`: Replicated cluster on AWS with backups enabled.
- `mongodbatlas_database_user.app_user`: Database user with `readWriteAnyDatabase` permissions.
- `mongodbatlas_project_ip_access_list.allow_ec2`: Allows access from the public IP address of the EC2 instance.

### 🌐 Networks & Subnets (VPC)

- `aws_vpc.main_vpc`: Main VPC (`10.0.0.0/16`) with DNS enabled.
- `aws_subnet.public_subnet`: Public subnet at `10.0.1.0/24`.
- `aws_subnet.private_subnet`: Private subnet at `10.0.2.0/24`.
- `aws_internet_gateway.gw`: Gateway for internet access.
- `aws_nat_gateway.nat`: NAT gateway for private subnets.
- `aws_route_table` + `aws_route_table_association`: Public and private route tables.

### 🔐 Security

#### Security Groups

- `aws_security_group.ec2_sg`: Allows SSH (22) access from authorized IP addresses and HTTP (8080) access from any IP address.
- `aws_security_group.rds_sg`: Allows connection to PostgreSQL (5432) **only from the EC2 instance security group**.

#### IAM

- `aws_iam_role.ec2_role`: EC2 role with policies:
  - `CloudWatchAgentServerPolicy`
  - `AmazonSSMManagedInstanceCore`
  - Custom inline policy: Grants read-only access to specific parameters under `/shop/`
- `aws_iam_instance_profile.ec2_instance_profile`: EC2 instance profile.

### 🖥️ Instances

#### EC2 - Backend App

- `aws_instance.app_server`: Public EC2 instance with:
    - IAM profile.
    - Access to SSM, logs, and parameters.
    - Initialization script (`user_data.sh`).
    - Label: `mauricio-backend-ec2`.

#### RDS - PostgreSQL

- `aws_db_instance.postgres`: PostgreSQL 15.3 instance with:
    - Private subnet.
    - Restricted security.
    - Backups enabled.
    - Size: `db.t3.micro`.
    - Database name: `shop`.

- `aws_db_subnet_group.default`: Private subnet grouping for RDS.

### 🔐 AWS SSM Parameters (Secrets Manager)

Located in `ssm_parameters.tf`:

| Name                        | Description                                         |
| --------------------------- | ----------------------------------------------------|
| `/shop/db/url`              | JDBC URL for PostgreSQL (SecureString)              |
| `/shop/db/username`         | PostgreSQL User (SecureString)                      |
| `/shop/db/password`         | PostgreSQL Password (SecureString)                  |
| `/shop/mongo/uri`           | MongoDB Atlas URI (SecureString)                    |
| `/shop/jwt/secret`          | Secret Key for Signing JWTs (SecureString)          |
| `/shop/jwt/cookie_secure`   | `Secure` Cookie Policy                              |
| `/shop/jwt/cookie_samesite` | `SameSite` Cookie Policy                            |
| `/shop/frontend/url`        | Frontend Public URL                                 |
| `/shop/app/admin_key`       | Secret Key for Creating Admin Users (SecureString)  |

## Input Variables

Located in `variables.tf`. You can override them via `terraform.tfvars` or `-var`.

| Variable                   | Description                                  | Mandatory    |
| -------------------------- | -------------------------------------------- | -----------  |
| `aws_region`               | AWS Region (`us-east-1` by default)          | ❌           |
| `ssh_ip`                   | IP allowed for SSH access                    | ✅           |
| `ami_id`                   | AMI for EC2 instance                         | ✅           |
| `instance_type`            | EC2 instance type (`t3.micro`)               | ❌           |
| `db_username`              | RDS PostgreSQL user                          | ✅           |
| `db_password`              | RDS PostgreSQL password                      | ✅           |
| `mongo_uri`                | MongoDB connection URI                       | ✅           |
| `jwt_secret`               | JWT secret key                               | ✅           |
| `frontend_url`             | Frontend URL (React / Next.js)               | ✅           |
| `mongodbatlas_public_key`  | MongoDB Atlas public API key                 | ✅           |
| `mongodbatlas_private_key` | MongoDB Atlas private API key                | ✅           |
| `mongodbatlas_org_id`      | MongoDB Atlas organization ID                | ✅           |
| `mongo_user`               | Created Mongo Atlas user                     | ✅           |
| `mongo_password`           | Mongo Atlas user password                    | ✅           |
| `mongo_instace_size`       | MongoDB cluster size (e.g., `M10`)           | ✅           |
| `mongo_region`             | Mongo Atlas cluster region (`US_EAST_1`)     | ✅           |
| `admin_key`                | Key to create admin users                    | ✅           |

## Requirements

- Terraform v1.5+
- Configured AWS credentials (`~/.aws/credentials`)
- MongoDB Atlas API keys

## Use

```bash
cd infra/

# Initialize Terraform
terraform init

# Check the plan
terraform plan

# Apply infrastructure
terraform apply
```

## Notes

- SSH access is restricted to a specific IP address (`var.ssh_ip`).
- MongoDB only allows access from the EC2 public IP address.
- Secrets are stored in AWS SSM as `SecureString`.

## Destruction of Infrastructure

```bash
terraform destroy
```

⚠️ This will delete all resources, including sensitive databases and parameters!


## Security

- `SecureString` is used for all secrets.
- Only EC2 has access to the RDS and MongoDB databases.
- Limited IAM roles with the principle of least privilege.

---
\> For more info about the backend visit the [backend README.md](../backend/README.md) <br/>
\> For more info about the frontend visit the [frontend README.md](../frontend/README.md)