-- Create a new user
CREATE USER 'bend'@'%' IDENTIFIED BY '123456789';

-- Grant all privileges on the database
GRANT ALL PRIVILEGES ON stock_data.* TO 'bend'@'%';

-- Apply changes
FLUSH PRIVILEGES;