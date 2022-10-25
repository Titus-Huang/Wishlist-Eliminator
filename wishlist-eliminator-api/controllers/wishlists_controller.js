const express = require('express');
const fetch = require('node-fetch');
const router = express.Router();

// models
const User = require('../models/user');
const Wishlist = require('../models/wishlist');

// routes
router.get('/import/:steamId', async (req, res) => {
    const steamId = req.params.steamId

    const steamWishlist = await fetch(`https://store.steampowered.com/wishlist/profiles/${steamId}/wishlistdata/`)
        .then(res => res.json())
    // if fetch fails, site will freeze
    // find a way to send data regardless
    res.send(steamWishlist);

        // .then(res => {
        //     console.log(res)
        //     // temporary, will need to cut out a lot of the wishlist data fat in the future
        //     // props.updateSteamWishlistData(res)

        // });
});

router.get('/', (req, res) => {
    // this is to add new wishlists
})

module.exports = router;
