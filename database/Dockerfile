# Use the official MySQL image from Docker Hub
FROM mysql:latest

# Set environment variables
ENV MYSQL_ROOT_PASSWORD=123456789
ENV MYSQL_DATABASE=stock_data
ENV MYSQL_USER=bend
ENV MYSQL_PASSWORD=123456789

# Copy initialization scripts to the Docker entrypoint initialization directory
COPY ./init.sql /docker-entrypoint-initdb.d/
COPY ./schema.sql /docker-entrypoint-initdb.d/

# Expose the default MySQL port
EXPOSE 3306
