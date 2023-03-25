FROM docker:20.10-dind

# Install Node.js and npm
FROM node:16-alpine

# Install Docker client
RUN apk add --no-cache docker-cli

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 8080

CMD [ "npm", "start" ]
