variable "aws_region" {
  description = "AWS Provider region"
  default     = "us-east-1"
}

variable "ssh_ip" {
  description = "pulbic IP allowed to connect to SSH"
  type        = string
}

variable "ami_id" {
  description = "AWS AMI id for EC2 instance"
  type        = string
}

variable "instance_type" {
  description = "EC2 instance type"
  type        = string
  default     = "t3.micro"
}

variable "db_username" {
  description = "PostgreSQL username"
  type        = string
}

variable "db_password" {
  description = "PostgreSQL password"
  type        = string
  sensitive   = true
}

variable "mongo_uri" {
  description = "MongoDB Atlas URI"
  type        = string
  sensitive   = true
}

variable "jwt_secret" {
  description = "JWT Signature Key"
  type        = string
  sensitive   = true
}

variable "frontend_url" {
  description = "Frontend URL"
  type        = string
}

variable "mongodbatlas_public_key" {
  description = "Public key for MongoDB Atlas"
  type        = string
  sensitive   = true
}
variable "mongodbatlas_private_key" {
  description = "Private key for MongoDB Atlas"
  type        = string
  sensitive   = true
}
variable "mongodbatlas_org_id" {
  description = "MongoDB Altas organization ID"
  type        = string
  sensitive   = true
}

variable "mongo_region" {
  description = "MongoDB Atlas cluster region"
  type        = string
  default     = "US_EAST_1"
}

variable "mongo_user" {
  description = "MongoDB Atlas user"
  type        = string
  sensitive   = true
}
variable "mongo_password" {
  description = "MongoDB Atlas password"
  type        = string
  sensitive   = true
}

variable "mongo_instace_size" {
  description = "MongoDB Atlas cluster configuration"
  type        = string
  default     = "M0"
}
