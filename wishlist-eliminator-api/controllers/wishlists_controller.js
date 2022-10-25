const express = require('express');
const fetch = require('node-fetch');
const router = express.Router();

// models
const User = require('../models/user');
const Wishlist = require('../models/wishlist');

// routes
router.get('/import/:steamId', async (req, res) => {
    const { steamId } = req.params

    const steamWishlist = await fetch(`https://store.steampowered.com/wishlist/profiles/${steamId}/wishlistdata/`)
        .then(res => res.json())
        .then(res => {
            // add wishlist data into local database
            
        })
    // if fetch fails, site will freeze
    // find a way to send data regardless
    res.status(200).send(steamWishlist);
});

router.post('/', (req, res) => {
    // this is to add new local wishlists
})

module.exports = router;
