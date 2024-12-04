-- Combined Schema for `appointments`, `events`, and `stocks` tables

-- Schema for `appointments` table
CREATE TABLE IF NOT EXISTS appointments (
  id INT NOT NULL AUTO_INCREMENT,
  title VARCHAR(255) NOT NULL,
  time VARCHAR(50) NOT NULL,
  description VARCHAR(255),
  PRIMARY KEY (id)
);

-- Schema for `events` table
CREATE TABLE IF NOT EXISTS events (
  id INT NOT NULL AUTO_INCREMENT,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  time VARCHAR(50) NOT NULL,
  image VARCHAR(255),
  date_added TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  text_align VARCHAR(50),
  font_size INT,
  text_color VARCHAR(10),
  PRIMARY KEY (id)
);

-- Schema for `stocks` table
CREATE TABLE IF NOT EXISTS stocks (
  id INT NOT NULL AUTO_INCREMENT,
  symbol VARCHAR(10) NOT NULL,
  price DECIMAL(10,2) NOT NULL,
  date_added DATETIME DEFAULT CURRENT_TIMESTAMP,
  direction ENUM('up', 'down', 'same') DEFAULT 'same',
  PRIMARY KEY (id)
);

-- Create a new user
CREATE USER 'bend'@'%' IDENTIFIED BY '123456789';

-- Grant all privileges on the database
GRANT ALL PRIVILEGES ON stock_data.* TO 'bend'@'%';

-- Apply changes
FLUSH PRIVILEGES;
