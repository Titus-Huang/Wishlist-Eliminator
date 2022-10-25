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
        .then(res => {
            // add wishlist data into local database

            // convert object to array of keys
            const resKeys = Object.keys(res);
            // iterate through object to create steam games
            let importedSteamList = {};
            // create list of games in order arranged
            resKeys.forEach((key, index) => {
                let gameSortIndex = res[key].priority;
                importedSteamList = {
                    ...importedSteamList,
                    [gameSortIndex] : key,
                }
            });

            console.log(importedSteamList);
            WishlistData.importSteamWishlist(userId, Object.values(importedSteamList));

            // let steamWishlist = res
            //     .forEach((key, index) => {
            //         console.log(game)
            //         return game
            //     })
                // .sort((a, b) => a.priority < b.priority)
            // console.table(steamWishlist)
        })
    // if fetch fails, site will freeze
    // find a way to send data regardless
    res.status(200).send(steamWishlist);
});

router.post('/', (req, res) => {
    // this is to add new local wishlists
})

module.exports = router;
