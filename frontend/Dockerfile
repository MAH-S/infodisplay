# Use a specific version of Node.js for consistency
FROM node:18-alpine

# Set the working directory inside the container
WORKDIR /frontend

# Copy package.json and package-lock.json to leverage Docker cache
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application files
COPY . .

# Set environment variable to address potential OpenSSL issues
ENV NODE_OPTIONS=--openssl-legacy-provider

# Build the frontend application
RUN npm run build

# Expose the application port
EXPOSE 3000

# Start the application
CMD ["npm", "start"]
