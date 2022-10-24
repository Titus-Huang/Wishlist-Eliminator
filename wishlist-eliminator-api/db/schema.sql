CREATE DATABASE wishlist_eliminator_db;
-- \c wishlist_eliminator_db

CREATE TYPE user_types AS ENUM ('user', 'admin');

CREATE TABLE users(
    id serial primary key,
    username text,
    display_name text,
    email text,
    password_digest text,
    user_type user_types
);

-- Display total data from users
SELECT * FROM users;
