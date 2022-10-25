const express = require('express');
const router = express.Router();

// models
const User = require('../models/user');
const Wishlist = require('../models/wishlist');

// routes
router.post('/', (req, res) => {
    const { userId, steamId } = req.body;

    console.log('userId length:', userId.length)

    // grab wishlist to see if it is valid
    // fetch(`https://store.steampowered.com/wishlist/profiles/${userId}/wishlistdata/`)

    // if it is invalid and/or empty, let the user know before allowing the "faulty" SteamId to be updated in their user data

    // if it is not invalid or faulty...
    // - update SteamId within their user data
    // - grab the wishlist and input it into the wishlist table, linking it back to the user
})

module.exports = router;
