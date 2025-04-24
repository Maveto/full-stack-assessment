output "instance_public_ip" {
  description = "Public IP of the EC2 instance"
  value       = aws_instance.app_server.public_ip
}

output "postgresql_endpoint" {
  description = "Endpoint of the PostgreSQL RDS instance"
  value       = aws_db_instance.postgres.address
}

output "frontend_url" {
  description = "Frontend base URL"
  value       = var.frontend_url
}
