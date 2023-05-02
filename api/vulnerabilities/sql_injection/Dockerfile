FROM php:7.2.2-apache
RUN docker-php-ext-install mysqli

# Copy PHP files
COPY ./php/ /var/www/html/

# Expose port 80 for web traffic
EXPOSE 80