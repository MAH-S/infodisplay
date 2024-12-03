# Use the official MySQL image from Docker Hub
FROM mysql:latest

# Set environment variables
ENV MYSQL_ROOT_PASSWORD=123456789
ENV MYSQL_DATABASE=stock_data

# Copy the schema.sql file to the Docker entrypoint initialization directory
COPY schema.sql /docker-entrypoint-initdb.d/

# Expose the default MySQL port
EXPOSE 3306
