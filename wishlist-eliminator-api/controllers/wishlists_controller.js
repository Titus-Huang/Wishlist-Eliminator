const express = require('express');
const fetch = require('node-fetch');
const router = express.Router();

// models
const User = require('../models/user');
const { Wishlist, WishlistData } = require('../models/wishlist');

// routes
router.get('/import/:steamId', async (req, res) => {
    const { steamId } = req.params
    const userId = req.session.userId

    const steamWishlist = await fetch(`https://store.steampowered.com/wishlist/profiles/${steamId}/wishlistdata/`)
        .then(res => res.json())
        .then(steamWishlist => {
            // add wishlist data into local database

            // convert object to array of keys
            const resKeys = Object.keys(steamWishlist);
            // check if there are any items in the wishlist
            if (resKeys.length > 0) {
                // iterate through object to create steam games
                let importedSteamList = {};
                // create list of games in order arranged
                resKeys.forEach((key) => {
                    let gameSortIndex = steamWishlist[key].priority;
                    importedSteamList = {
                        ...importedSteamList,
                        [gameSortIndex] : key,
                    }
                });

                // console.log(importedSteamList);
                WishlistData.importSteamWishlist(userId, Object.values(importedSteamList))
                res.json(importedSteamList);

                // after data is put within wishlist_data
                // now putting data into first OG wishlist post
            } else {
                res.status(404).json({ error: 'unable to find wishlist from Steam' })
            }
        })
    // if fetch fails, site will freeze
    // find a way to send data regardless
    // res.status(200).send(steamWishlist);
});

router.post('/', (req, res) => {
    // this is to add new local wishlists
})

module.exports = router;
