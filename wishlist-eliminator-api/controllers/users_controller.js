// Found SteamId package that checks if input is valid
// Also outputs to other forms of Steam Id
// https://www.npmjs.com/package/steamid
const SteamID = require('steamid');
const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');

// models
const User = require('../models/user');
const { WishlistData } = require('../models/wishlist');

// routes
router.post('/', (req, res) => {
    const { username, email, password } = req.body;

    // using bcrypt to create password digest
    const passwordDigest = bcrypt.hashSync(password, bcrypt.genSaltSync(10), null);

    User
        .create(username, email, passwordDigest)
        .then(userData => {
            WishlistData
                .create(userData.id);
                // .then(wishlistDataRes => console.log(wishlistDataRes))
            res.json(userData);
        });
})

router.post('/steamid', (req, res) => {
    const { userId, steamId } = req.body;
    let sId;
    // console.log('res before:', res, 'res type before:', typeof res)
    try {
        sId = new SteamID(steamId);
    } catch (err) {
        console.error(err);
        return res.status(400).json({ error: "SteamId provided is not valid."});
    }
    // console.log('is provided Steam Id valid:', sId.isValid());

    if (sId.isValid()) {
        // if it is not invalid or faulty...
        // - update SteamId within their user data
        // - grab the wishlist (on client side to do a Steam API call) and input it into the wishlist table, linking it back to the user

        User
            .updateSteamId(userId, steamId)
            .then(resData => res.json(resData.steam_id))
    } else {
        res.status(400).json({ error: "SteamId provided is not valid."})
    }
})

module.exports = router;
