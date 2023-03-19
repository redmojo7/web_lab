CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  first_name VARCHAR(255) NOT NULL,
  last_name VARCHAR(255) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL
);

INSERT INTO users (first_name, last_name, email, password)
VALUES ('John', 'Doe', 'johndoe@example.com', 'password123'),
       ('Jane', 'Doe', 'janedoe@example.com', 'password456'),
       ('Bob', 'Smith', 'bobsmith@example.com', 'password789'),
       ('Sally', 'Jones', 'sallyjones@example.com', 'password1234'),
       ('Tom', 'Jones', 'tomjones@example.com', 'password5678'),
       ('Sarah', 'Johnson', 'sarahjohnson@example.com', 'password9012'),
       ('David', 'Brown', 'davidbrown@example.com', 'password3456'),
       ('Laura', 'Taylor', 'laurataylor@example.com', 'password7890'),
       ('Mike', 'Davis', 'mikedavis@example.com', 'password12345'),
       ('Emily', 'Wilson', 'emilywilson@example.com', 'password6789');
