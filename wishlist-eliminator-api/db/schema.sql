CREATE DATABASE wishlist_eliminator_db;
-- \c wishlist_eliminator_db

CREATE TYPE user_types AS ENUM ('user', 'admin');

CREATE TABLE users(
    id serial primary key,
    username text,
    display_name text,
    email text,
    password_digest text,
    user_type user_types,
    steam_id TEXT
);

-- Display total data from users
SELECT * FROM users;

-- Reset Users table
TRUNCATE TABLE users;
ALTER SEQUENCE users_id_seq RESTART WITH 1;

-- Adding additional datapoints within table
ALTER TABLE users ADD COLUMN steam_id TEXT;
