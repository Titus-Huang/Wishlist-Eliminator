const db = require('../db/db');

// < wishlists_data >

// id serial primary key,

// -- user data
// user_id integer,
// added_at timestamp,
// steam_sorted_game_ids integer[],

// -- local list data
// local_lists integer[]



// < wishlists >

// id serial primary key,

// -- row data
// wishlists_data_id integer,
// created_at timestamp,
// edited_at timestamp,

// -- local data
// game_ids integer[],
// game_name text[],
// game_img_bg text[],
// date_added timestamp[],
// release_date timestamp[],
// release_date_str text[],
// deck_compat integer[],
// purchased boolean[]

// wishlist data (ONE per user)
const WishlistData = {
    // this is called when a user is created
    create: (userId) => {
        const sql = `
            INSERT INTO wishlists_data (user_id)
            VALUES ($1)
            RETURNING *
        `;

        return db
            .query(sql, [userId])
            .then(dbRes => dbRes.rows[0])
    }
};


// individual lists (users can have multiple)
const Wishlist = {
    // called when Steam Wishlist data is imported
    // create: () => {

    // }
};

module.exports = { WishlistData, Wishlist }
