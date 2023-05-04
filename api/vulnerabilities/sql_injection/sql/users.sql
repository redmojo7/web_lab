CREATE TABLE IF NOT EXISTS users (
    id INT(6) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(30) NOT NULL,
    password VARCHAR(30) NOT NULL,
    role VARCHAR(10) NOT NULL
);

INSERT INTO users (username, password, role) VALUES ('admin', 'hello123', 'admin');
INSERT INTO users (username, password, role) VALUES ('user1', 'user123', 'user');
