const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');

// models
const User = require('../models/user')

// routes
router.post('/', (req, res) => {
    const { username, email, password } = req.body;

    // using bcrypt to create password digest
    const passwordDigest = bcrypt.hashSync(password, bcrypt.genSaltSync(10), null);

    User
        .create(username, email, passwordDigest)
        .then(userData => res.json(userData));
})

module.exports = router;
