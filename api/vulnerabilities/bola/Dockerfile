# Use the official Node.js 16.x image as the base image
FROM node:16-alpine

# Set the working directory in the container
WORKDIR /app

# Copy the package.json and package-lock.json files to the container
COPY package*.json ./
COPY files /app/files
COPY views/ /app/views

# Install the dependencies
RUN npm install

# Copy the application code to the container
COPY . .

# Set the environment variable for the port number
ENV PORT=9300

# Expose the port number to the outside world
EXPOSE $PORT

# Start the Node.js application
CMD ["npm", "start"]
