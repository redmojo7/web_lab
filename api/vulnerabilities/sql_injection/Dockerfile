FROM php:7.2.2-apache
RUN docker-php-ext-install mysqli

# Copy PHP files
COPY ./php/ /var/www/html/

# Install MySQL client
RUN apt-get update && apt-get install -y mysql-client

# Expose port 80 for web traffic
EXPOSE 80