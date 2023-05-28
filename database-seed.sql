CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL
);

INSERT INTO users (email, password)
VALUES
  ('johndoe@example.com', 'password123'),
  ('janedoe@example.com', 'password456'),
  ('bobsmith@example.com', 'password789'),
  ('sallyjones@example.com', 'password1234'),
  ('tomjones@example.com', 'password5678'),
  ('sarahjohnson@example.com', 'password9012'),
  ('davidbrown@example.com', 'password3456'),
  ('laurataylor@example.com', 'password7890'),
  ('mikedavis@example.com', 'password12345'),
  ('emilywilson@example.com', 'password6789');