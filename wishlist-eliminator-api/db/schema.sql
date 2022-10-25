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




CREATE TABLE wishlists_data(
    id serial primary key,
    -- user data
    user_id integer,
    added_time timestamp,
    edited_time timestamp,
    -- steam data
    steam_sorted_game_ids integer[],
    -- local list data
    local_lists integer[]
);

-- Display total data from wishlists_data
SELECT * FROM wishlists_data;

-- Reset Wishlists Data table
TRUNCATE TABLE wishlists_data;
ALTER SEQUENCE wishlists_data_id_seq RESTART WITH 1;




CREATE TABLE wishlists(
    id serial primary key,
    -- reference wishlists_data
    wishlists_data_id integer,
    -- local data
    game_ids integer[],
    game_name text[],
    game_background text[],
    date_added timestamp[],
    release_date timestamp[],
    release_date_string text[],
    deck_compatibility integer[],
    purchased boolean[]
);

-- Display total data from wishlists
SELECT * FROM wishlists;

-- Reset Wishlists table
TRUNCATE TABLE wishlists;
ALTER SEQUENCE wishlists_id_seq RESTART WITH 1;
