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



CREATE TABLE wishlists(
    id serial primary key,
    user_id integer,
    added_time timestamp,
    edited_time timestamp,
    steam_sorted_game_ids integer[],
    local_sorted_game_ids integer[],
    local_sorted_game_name text[],
    local_sorted_game_background text[],
    local_sorted_date_added timestamp[],
    local_sorted_release_date timestamp[],
    local_sorted_release_date_string text[],
    local_sorted_deck_compatibility integer[],
    purchased boolean[]
);

-- Display total data from users
SELECT * FROM wishlists;

-- Reset Users table
TRUNCATE TABLE wishlists;
ALTER SEQUENCE wishlists_id_seq RESTART WITH 1;
