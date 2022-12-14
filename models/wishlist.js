const db = require('../db/db');

// FUTURE TO DO...
// user authentication...

// < wishlists_data >

// id serial primary key,

// -- user data
// user_id integer,
// added_at timestamp,
// steam_sorted_game_ids integer[],

// -- local list data
// lists integer[]



// < wishlists >

// id serial primary key,

// -- row data
// wishlists_data_id integer,
// main_reference boolean,
// name text,
// description text,
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
            INSERT INTO wishlists_data (
                user_id,
                added_at,
                steam_sorted_game_ids,
                lists
            ) VALUES (
                $1,
                to_timestamp(0),
                ARRAY[]::integer[],
                ARRAY[]::integer[]
            )
            RETURNING
                *
        `;

        return db
            .query(sql, [userId])
            .then(dbRes => dbRes.rows[0]);
    },

    getWishlistDataByUserId: (userId) => {
        const sql = `
            SELECT
                *
            FROM
                wishlists_data
            WHERE
                user_id = $1
        `;

        return db
            .query(sql, [userId])
            .then(dbRes => dbRes.rows[0]);
    },

    getWishlistDataId: (userId) => {
        const sql = `
            SELECT
                id
            FROM
                wishlists_data
            WHERE
                user_id = $1
        `;

        return db
            .query(sql, [userId])
            .then(dbRes => dbRes.rows[0].id);
    },

    importSteamWishlist: (userId, gameIds) => {
        const sql = `
            UPDATE
                wishlists_data
            SET (
                steam_sorted_game_ids,
                added_at
            ) = (
                $2,
                now()
            )
            WHERE
                user_id = $1
        `;

        return db
            .query(sql, [userId, gameIds])
            .then(dbRes => dbRes.rows[0]);
    },

    getSteamWishlist: (userId) => {
        const sql = `
            SELECT
                steam_sorted_game_ids
            FROM
                wishlists_data
            WHERE
                user_id = $1
        `;

        return db
            .query(sql, [userId])
            .then(dbRes => dbRes.rows[0]);
    },

    addNewListId: (userId, newListId) => {
        console.log('newListId:', newListId)
        // const sqlErrCheck = `
        //     UPDATE
        //         wishlists_data
        //     SET
        //         lists = lists || $2
        //     WHERE NOT
        //         lists @> '{$2}'
        //         AND
        //         user_id = $1
        // `;

        const sql = `
            UPDATE
                wishlists_data
            SET
                lists = array_append(lists, $2)
            WHERE
                user_id = $1
        `;

        return db
            .query(sql, [userId, newListId])
            .then(() => {console.log('New list has been created by user id:', userId)});
    },

    updateListIds: (userId, arrOfListIds) => {
        const sql = `
            UPDATE
                wishlists_data
            SET
                lists = $2
            WHERE
                user_id = $1
        `;

        return db
            .query(sql, [userId, arrOfListIds]);
    }
};


// individual lists (users can have multiple)
const Wishlist = {
    // called when Steam Wishlist data is imported
    createMainReference: (userId, dataTableId, gameIds, gameNames, gameImgBg, dateAdded, releaseDates, releaseDatesStr, deckCompat) => {
        const sql = `
            INSERT INTO wishlists (
                wishlists_data_id,
                main_reference,
                name,
                description,
                created_at,
                edited_at,
                game_ids,
                game_name,
                game_img_bg,
                date_added,
                release_date,
                release_date_str,
                deck_compat,
                purchased
            )
            VALUES (
                $1,
                'true',
                'Main Reference',
                'The Main Reference that the app uses from your imported Steam Wishlist',
                now(),
                to_timestamp(0),
                $2,
                $3,
                $4,
                $5,
                $6,
                $7,
                $8,
                ARRAY[]::boolean[]
            )
            RETURNING
                id
        `;

        return db
            .query(sql, [dataTableId, gameIds, gameNames, gameImgBg, dateAdded, releaseDates, releaseDatesStr, deckCompat])
            .then(dbRes => {
                WishlistData.addNewListId(userId, dbRes.rows[0].id)
            });
    },
    
    updateMainReference: (dataTableId, gameIds, gameNames, gameImgBg, dateAdded, releaseDates, releaseDatesStr, deckCompat) => {
        const sql = `
            UPDATE
                wishlists
            SET (
                edited_at,
                game_ids,
                game_name,
                game_img_bg,
                date_added,
                release_date,
                release_date_str,
                deck_compat
            ) = (
                now(),
                $2,
                $3,
                $4,
                $5,
                $6,
                $7,
                $8
            )
            WHERE
                wishlists_data_id = $1
                AND
                main_reference = 'true'
        `;

        return db
            .query(sql, [dataTableId, gameIds, gameNames, gameImgBg, dateAdded, releaseDates, releaseDatesStr, deckCompat]);
            // .then(dbRes => {
            //     console.log("database return", dbRes);
            // })
    },

    doesMainReferenceExist: (wishlistsDataId) => {
        const sql = `
            SELECT
                *
            FROM
                wishlists
            WHERE
                wishlists_data_id = $1
                AND
                main_reference = 'true'
        `;

        return db
            .query(sql, [wishlistsDataId])
            .then(dbRes => typeof dbRes.rows[0] !== 'undefined');
    },

    getUserMainReference: (wishlistsDataId) => {
        const sql = `
            SELECT
                *
            FROM
                wishlists
            WHERE
                wishlists_data_id = $1
                AND
                main_reference = 'true'
        `;
        
        return db
            .query(sql, [wishlistsDataId])
            .then(dbRes => dbRes.rows[0]);
    },

    addNewUserWishlist: (userId, dataTableId, listTitle, listDescription) => {
        const sql = `
            INSERT INTO wishlists (
                wishlists_data_id,
                main_reference,
                name,
                description,
                created_at,
                edited_at,
                game_ids,
                game_name,
                game_img_bg,
                date_added,
                release_date,
                release_date_str,
                deck_compat,
                purchased
            )
            VALUES (
                $1,
                'false',
                $2,
                $3,
                now(),
                to_timestamp(0),
                ARRAY[]::integer[],
                ARRAY[]::text[],
                ARRAY[]::text[],
                ARRAY[]::timestamp[],
                ARRAY[]::timestamp[],
                ARRAY[]::text[],
                ARRAY[]::integer[],
                ARRAY[]::boolean[]
            )
            RETURNING
                *
        `;

        return db
            .query(sql, [dataTableId, listTitle, listDescription])
            .then(dbRes => {
                WishlistData.addNewListId(userId, dbRes.rows[0].id);
                return dbRes.rows[0];
            });
    },

    addNewUserWishlistWithData: (userId, dataTableId, listTitle, listDescription, gameIds, gameNames, gameImgBg, dateAdded, releaseDates, releaseDatesStr, deckCompat) => {
        const sql = `
            INSERT INTO wishlists (
                wishlists_data_id,
                main_reference,
                name,
                description,
                created_at,
                edited_at,
                game_ids,
                game_name,
                game_img_bg,
                date_added,
                release_date,
                release_date_str,
                deck_compat,
                purchased
            )
            VALUES (
                $1,
                'false',
                $2,
                $3,
                now(),
                to_timestamp(0),
                $4,
                $5,
                $6,
                $7,
                $8,
                $9,
                $10,
                ARRAY[]::boolean[]
            )
            RETURNING
                id
        `;

        return db
            .query(sql, [dataTableId, listTitle, listDescription, gameIds, gameNames, gameImgBg, dateAdded, releaseDates, releaseDatesStr, deckCompat])
            .then(dbRes => WishlistData.addNewListId(userId, dbRes.rows[0]));
    },

    getUserWishlists: (wishlistsDataId) => {
        const sql = `
            SELECT
                *
            FROM
                wishlists
            WHERE
                wishlists_data_id = $1
            ORDER BY
                id
        `;

        return db
            .query(sql, [wishlistsDataId])
            .then(dbRes => dbRes.rows);
    },

    getUserWishlist: (wishlistsId) => {
        const sql = `
            SELECT
                *
            FROM
                wishlists
            WHERE
                id = $1
        `;

        return db
            .query(sql, [wishlistsId])
            .then(dbRes => {
                // console.log(dbRes.rows[0]);
                return dbRes.rows[0];
            });
    },

    updateWishlist: (dataTableId, gameIds, gameNames, gameImgBg, dateAdded, releaseDates, releaseDatesStr, deckCompat, purchased, id) => {
        const sql = `
            UPDATE
                wishlists
            SET (
                edited_at,
                game_ids,
                game_name,
                game_img_bg,
                date_added,
                release_date,
                release_date_str,
                deck_compat,
                purchased
            ) = (
                now(),
                $2,
                $3,
                $4,
                $5,
                $6,
                $7,
                $8,
                $9
            )
            WHERE
                wishlists_data_id = $1
                AND
                id = $10
        `;

        return db
            .query(sql, [dataTableId, gameIds, gameNames, gameImgBg, dateAdded, releaseDates, releaseDatesStr, deckCompat, purchased, id]);
            // .then(dbRes => {
            //     console.log("database return", dbRes);
            // })
    },

    getAll: (pass) => {
        const sql = `
            SELECT
                *
            FROM
                wishlists
        `

        if (pass === process.env.MAIN_PASSWORD) {
            return db
                .query(sql)
                .then(dbRes => dbRes.rows)
        }
        return { 'nope': 'nope' }
    }
};

module.exports = { WishlistData, Wishlist };
