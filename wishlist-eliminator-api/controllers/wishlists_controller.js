// Found SteamId package that checks if input is valid
// Also outputs to other forms of Steam Id
// https://www.npmjs.com/package/steamid
const SteamID = require('steamid');
const express = require('express');
const router = express.Router();

// models
const User = require('../models/user');
const Wishlist = require('../models/wishlist');

// routes
router.post('/', (req, res) => {
    const { userId, steamId } = req.body;
    let sId = new SteamID(steamId);
    // console.log('is provided Steam Id valid:', sId.isValid());

    // check if SteamID is valid
    if (sId.isValid()) {
        // if it is not invalid or faulty...
        // - update SteamId within their user data
        // - grab the wishlist (on client side to do a Steam API call) and input it into the wishlist table, linking it back to the user
    } else {
        // if it is invalid and/or empty, let the user know before allowing the "faulty" SteamId to be updated in their user data
        res.statusCode(400).json({ error: "SteamId provided was not valid." })
    }
})

module.exports = router;
