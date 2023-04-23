CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    ip VARCHAR(45) NOT NULL,
    profile_url VARCHAR(255),
    birthday DATE
);

CREATE TABLE addresses (
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL,
    street VARCHAR(100) NOT NULL,
    city VARCHAR(50) NOT NULL,
    state VARCHAR(50) NOT NULL,
    country VARCHAR(50) NOT NULL,
    postal_code VARCHAR(20) NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users (id)
);

CREATE TABLE messages (
    id SERIAL PRIMARY KEY,
    sender_id INTEGER NOT NULL,
    recipient_id INTEGER NOT NULL,
    message TEXT NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT NOW(),
    FOREIGN KEY (sender_id) REFERENCES users (id),
    FOREIGN KEY (recipient_id) REFERENCES users (id)
);

-- password : z123

INSERT INTO users (name, email, password, ip, birthday, profile_url)
VALUES
    ('John Doe', 'johndoe@example.com', '$2a$10$Sv/r1qoRyXLccgKx5FJmZug/ATL2emRivBN6mgX.v7yQvlwYPJNQi', '49.194.176.123', '1990-01-01', 'http://localhost:9400/api/images/johndoe'),
    ('Jane Smith', 'janesmith@example.com', '$2a$10$Sv/r1qoRyXLccgKx5FJmZug/ATL2emRivBN6mgX.v7yQvlwYPJNQi', '15.168.14.59', '1995-05-15', 'http://localhost:9400/api/images/janesmith');

INSERT INTO addresses (user_id, street, city, state, country, postal_code)
VALUES
    (1, '123 Main St', 'Perth', 'WA', 'AU', '6010'),
    (2, '6 Chrome', 'Konohana War', 'Osaka', 'JP', '554-0024');
