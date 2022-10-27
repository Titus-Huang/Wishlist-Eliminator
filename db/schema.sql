CREATE DATABASE wishlist_eliminator_db;
-- \c wishlist_eliminator_db

-- Reset & Updates database
-- heroku pg:reset --confirm wishlist-eliminator-titus; heroku pg:push wishlist_eliminator_db DATABASE_URL

-- Manually access Heroku database
-- heroku pg:psql

CREATE TYPE user_types AS ENUM ('user', 'admin');

CREATE TABLE users(
    id serial primary key,
    username text,
    display_name text,
    email text,
    password_digest text,
    user_type user_types,
    steam_id text
);

CREATE TABLE test3 (
    id serial primary key,
    test_text text,
    empty_text text
);
INSERT INTO test3 (test_text, empty_text)
VALUES ('akdjawkldjaw', '');

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
    added_at timestamp,
    steam_sorted_game_ids integer[],
    -- local list data
    lists integer[]
);

-- Display total data from wishlists_data
SELECT * FROM wishlists_data;

-- Reset Wishlists Data table
TRUNCATE TABLE wishlists_data;
ALTER SEQUENCE wishlists_data_id_seq RESTART WITH 1;




CREATE TABLE wishlists(
    id serial primary key,
    -- row data
    wishlists_data_id integer,
    main_reference boolean,
    name text,
    description text,
    created_at timestamp,
    edited_at timestamp,
    -- local data
    game_ids integer[],
    game_name text[],
    game_img_bg text[],
    date_added timestamp[],
    release_date timestamp[],
    release_date_str text[],
    deck_compat integer[],
    purchased boolean[]
);

CREATE TABLE test1(
    id serial primary key,
    purchased boolean[]
);

INSERT INTO test1 (
                purchased
            )
            VALUES (
                ARRAY []
            );

CREATE TABLE test2(
    id serial primary key,
    time_test timestamp,
    empty_text text[]
);
INSERT INTO test2 (
    time_test, empty_text)
    VALUES (
        to_timestamp(0), ARRAY[]::text[]
    );


-- TO DO:
-- Add in user notes/descriptions of each game, this would be awesome and I can't believe I forgot to do this

-- Display total data from wishlists
SELECT * FROM wishlists;

-- Reset Wishlists table
TRUNCATE TABLE wishlists;
ALTER SEQUENCE wishlists_id_seq RESTART WITH 1;
