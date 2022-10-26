const express = require('express');
const fetch = require('node-fetch');
const router = express.Router();

// models
const User = require('../models/user');
const { Wishlist, WishlistData } = require('../models/wishlist');

// routes
router.get('/', (req, res) => {
    // this is to send user's wishlist data... data :P
    if (req.session.userId) {
        let returnData = {
            userListData: {},
            userWishlists: {}
        }
        WishlistData
            .getWishlistDataByUserId(req.session.userId)
            .then(wishlistData => {
                returnData.userListData = wishlistData;
                // console.log('wishlistData:', wishlistData);

                Wishlist
                    .getUserWishlists(wishlistData.id)
                    .then(lists => {
                        // console.log('lists:', lists);
                        returnData.userWishlists = lists
                    })
                    .then(() => {
                        // console.log('returndata:', returnData);
                        res.status(200).json(returnData)
                    })
            })
    } else {
        res.json({ error: 'no one logged in' });
    }
})

router.post('/', (req, res) => {
    // this is to add new local wishlists
})

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
                // check if Main Reference exists

                WishlistData
                    .getWishlistDataId(userId)
                    .then(dataId => {
                        // console.log('dataId', dataId)
                        Wishlist
                            .doesMainReferenceExist(dataId)
                            .then(doesMainExist => { return {dataId, doesMainExist}})
                            .then(checks => {
                                // console.log('SteamWishlist', steamWishlist);
                                // console.log('ResKeys', resKeys);
                                // console.log('importedSteamList', importedSteamList);

                                const gameIds = [];
                                const gameNames = [];
                                const gameImgBg = [];
                                const dateAdded = [];
                                const releaseDates = [];
                                const releaseDatesStr = [];
                                const deckCompat = [];
                                for (let i = 1; i <= resKeys.length; i++) {
                                    // console.log('imported steam list app Id', importedSteamList[i])
                                    // console.log('game info', steamWishlist[importedSteamList[i]].name)
                                    gameIds.push(importedSteamList[i]);
                                    gameNames.push(steamWishlist[importedSteamList[i]].name);
                                    gameImgBg.push(steamWishlist[importedSteamList[i]].background);

                                    let date_added = new Date(steamWishlist[importedSteamList[i]].added * 1000)
                                    dateAdded.push(date_added.toISOString());
                                    
                                    const release_date = new Date(steamWishlist[importedSteamList[i]].release_date * 1000);
                                    const epochZero = new Date(0)
                                    const timeCheckCuttoff = Date.now() - (60 * 1000);
                                    // check if the time has been inputted by the developers
                                    if (release_date !== '' && release_date < timeCheckCuttoff) {
                                        // check if it's far in the past or "recently" (within the last 1 minute, due to internet latency sometimes)
                                        // console.log('release_date', release_date, 'compared to', timeCheckCuttoff)
                                        releaseDates.push(release_date.toISOString());
                                    } else {
                                        releaseDates.push(epochZero.toISOString());
                                    }

                                    releaseDatesStr.push(steamWishlist[importedSteamList[i]].release_string);
                                    deckCompat.push(steamWishlist[importedSteamList[i]].deck_compat);
                                }

                                if (checks.doesMainExist) {
                                    // console.log("main copy DOES exist!!!");
                                    Wishlist.updateMainReference(checks.dataId, gameIds, gameNames, gameImgBg, dateAdded, releaseDates, releaseDatesStr, deckCompat);
                                } else {
                                    // console.log("main copy does NOT exist!!!");
                                    // console.log(dateAdded);
                                    Wishlist.createMainReference(userId, checks.dataId, gameIds, gameNames, gameImgBg, dateAdded, releaseDates, releaseDatesStr, deckCompat);
                                }
                            })
                    })
            } else {
                res.status(404).json({ error: 'unable to find wishlist from Steam' });
            }
        })
    // if fetch fails, site will freeze
    // find a way to send data regardless
    // res.status(200).send(steamWishlist);
});

module.exports = router;
