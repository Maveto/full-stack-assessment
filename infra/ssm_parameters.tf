# PostgreSQL URL
resource "aws_ssm_parameter" "db_url" {
  name  = "/shop/db/url"
  type  = "SecureString"
  value = "jdbc:postgresql://${aws_db_instance.postgres.address}:${aws_db_instance.postgres.port}/shop"
}

# Postgres Username
resource "aws_ssm_parameter" "db_username" {
  name  = "/shop/db/username"
  type  = "SecureString"
  value = var.db_username
}

# Postgres Password
resource "aws_ssm_parameter" "db_password" {
  name  = "/shop/db/password"
  type  = "SecureString"
  value = var.db_password
}

# MongoDB URI
resource "aws_ssm_parameter" "mongo_uri" {
  name  = "/shop/mongo/uri"
  type  = "SecureString"
  value = var.mongo_uri
}

# JWT Secret
resource "aws_ssm_parameter" "jwt_secret" {
  name  = "/shop/jwt/secret"
  type  = "SecureString"
  value = var.jwt_secret
}

# JWT Cookie secure (HTTPS Only) "true/false"
resource "aws_ssm_parameter" "jwt_cookie_secure" {
  name  = "/shop/jwt/cookie_secure"
  type  = "String"
  value = "true"
}

# JWT Cookie sameSite "Strict/Lax/None"
resource "aws_ssm_parameter" "jwt_cookie_samesite" {
  name  = "/shop/jwt/cookie_samesite"
  type  = "String"
  value = "Lax"
}

# Frontend URL
resource "aws_ssm_parameter" "frontend_url" {
  name  = "/shop/frontend/url"
  type  = "String"
  value = var.frontend_url
}

# Key to create admin users
resource "aws_ssm_parameter" "admin_key" {
  name  = "/shop/app/admin_key"
  type  = "SecureString"
  value = var.admin_key
}
