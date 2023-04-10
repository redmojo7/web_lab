FROM docker:20.10-dind

# Install Node.js and npm
FROM node:16-alpine

# Install dependencies for running Docker and Docker Compose
RUN apk add --no-cache \
    libc6-compat \
    curl \
    bash \
    py-pip \
    python3-dev \
    libffi-dev \
    openssl-dev \
    gcc \
    libc-dev \
    make \
    git

# Install Docker client
RUN apk add --no-cache docker-cli

# Install Docker Compose
RUN pip install docker-compose==1.29.2

# Set the working directory
WORKDIR /app

# Copy the application files
COPY package*.json ./
RUN npm install
COPY . .

# Give run privilege
RUN chmod +x /app/vulnerabilities/run_container.sh

# Expose the port used by the application
EXPOSE 8180

# Set the start command
CMD [ "npm", "start" ]
