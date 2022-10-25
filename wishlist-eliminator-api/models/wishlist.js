const db = require('../db/db');

//     < wishlists_data >

//     id serial primary key,

//     -- user data
//     user_id integer,
//     added_time timestamp,
//     edited_time timestamp,

//     -- steam data
//     steam_sorted_game_ids integer[],

//     -- local list data
//     local_lists integer[]



//     < wishlists >

//     id serial primary key,

//     -- reference wishlists_data
//     wishlists_data_id integer,

//     -- local data
//     game_ids integer[],
//     game_name text[],
//     game_background text[],
//     date_added timestamp[],
//     release_date timestamp[],
//     release_date_string text[],
//     deck_compatibility integer[],
//     purchased boolean[]


const Wishlist = {
    // this is called when a user is created
    create: () => {

    }
};

module.exports = Wishlist;
