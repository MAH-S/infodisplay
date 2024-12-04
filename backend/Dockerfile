FROM node:alpine

# Install required packages
RUN apk add --no-cache mysql-client mariadb-connector-c mariadb-connector-c-dev bash

# Set working directory
WORKDIR /app

# Copy backend files
COPY . .

# Install Node.js dependencies
RUN npm install

# Expose the application port
EXPOSE 5050

# Start the application
CMD ["npm", "start"]
