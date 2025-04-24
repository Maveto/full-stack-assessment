#!/bin/bash
set -e

echo "Installing the necessary dependencies..."
sudo yum update -y
sudo yum install -y wget
sudo yum install -y awscli amazon-ssm-agent
sudo systemctl enable amazon-ssm-agent
sudo systemctl start amazon-ssm-agent

echo "Installing Java 24 manually..."
cd /home/ec2-user
wget https://download.oracle.com/java/24/latest/jdk-24_linux-x64_bin.tar.gz
tar -xzf jdk-24_linux-x64_bin.tar.gz
sudo mv jdk-24* /opt/java24
echo 'export JAVA_HOME=/opt/java24' | sudo tee -a /etc/profile
echo 'export PATH=$JAVA_HOME/bin:$PATH' | sudo tee -a /etc/profile
source /etc/profile

echo "Java installed: $(java -version)"

echo "Fetch environment variables from SSM..."
POSTGRESQL_URL=$(aws ssm get-parameter --name "/shop/db/url" --with-decryption --query "Parameter.Value" --output text)
POSTGRESQL_USERNAME=$(aws ssm get-parameter --name "/shop/db/username" --with-decryption --query "Parameter.Value" --output text)
POSTGRESQL_PASSWORD=$(aws ssm get-parameter --name "/shop/db/password" --with-decryption --query "Parameter.Value" --output text)
MONGODB_URI=$(aws ssm get-parameter --name "/shop/mongo/uri" --with-decryption --query "Parameter.Value" --output text)
JWT_SECRET_KEY=$(aws ssm get-parameter --name "/shop/jwt/secret" --with-decryption --query "Parameter.Value" --output text)
JWT_COOKIE_SECURE=$(aws ssm get-parameter --name "/shop/jwt/cookie_secure" --query "Parameter.Value" --output text)
JWT_COOKIE_SAMESITE=$(aws ssm get-parameter --name "/shop/jwt/cookie_samesite" --query "Parameter.Value" --output text)
FRONTEND_URL=$(aws ssm get-parameter --name "/shop/frontend/url" --query "Parameter.Value" --output text)

echo "Saving environment variables..."
echo "export POSTGRESQL_URL=${POSTGRESQL_URL}" >> /etc/profile
echo "export POSTGRESQL_USERNAME=${POSTGRESQL_USERNAME}" >> /etc/profile
echo "export POSTGRESQL_PASSWORD=${POSTGRESQL_PASSWORD}" >> /etc/profile
echo "export MONGODB_URI=${MONGODB_URI}" >> /etc/profile
echo "export JWT_SECRET_KEY=${JWT_SECRET_KEY}" >> /etc/profile
echo "export JWT_COOKIE_SECURE=${JWT_COOKIE_SECURE}" >> /etc/profile
echo "export JWT_COOKIE_SAMESITE=${JWT_COOKIE_SAMESITE}" >> /etc/profile
echo "export FRONTEND_URL=${FRONTEND_URL}" >> /etc/profile

echo "Creating a systemd service for a Spring Boot app..."

sudo tee /etc/systemd/system/shop.service > /dev/null <<EOL
[Unit]
Description=Shop Backend Service
After=network.target

[Service]
ExecStart=/opt/java24/bin/java -jar /home/ec2-user/app.jar
WorkingDirectory=/home/ec2-user
Environment="POSTGRESQL_URL=${POSTGRESQL_URL}"
Environment="POSTGRESQL_USERNAME=${POSTGRESQL_USERNAME}"
Environment="POSTGRESQL_PASSWORD=${POSTGRESQL_PASSWORD}"
Environment="MONGODB_URI=${MONGODB_URI}"
Environment="JWT_SECRET_KEY=${JWT_SECRET_KEY}"
Environment="JWT_COOKIE_SECURE=${JWT_COOKIE_SECURE}"
Environment="JWT_COOKIE_SAMESITE=${JWT_COOKIE_SAMESITE}"
Environment="FRONTEND_URL=${FRONTEND_URL}"
Restart=always
User=ec2-user
Group=ec2-user

[Install]
WantedBy=multi-user.target
EOL

echo "Reloading systemd and activating service..."
sudo systemctl daemon-reload
sudo systemctl enable shop.service

if [ -f /home/ec2-user/app.jar ]; then
  echo "Starting app as systemd service..."
  sudo systemctl start shop.service
else
  echo "The app.jar file was not found. You can upload it and use: sudo systemctl start shop"
fi
