FROM node:alpine

# Set the working directory inside the container
WORKDIR /frontend

# Copy all files from the current directory to the container
COPY . .

# Set environment variable to fix OpenSSL issue
ENV NODE_OPTIONS=--openssl-legacy-provider

# Install dependencies
RUN npm install

# Start the application
CMD ["npm", "start"]
