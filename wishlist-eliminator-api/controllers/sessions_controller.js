const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');

// models
const User = require('../models/user');

// finding if local userId is logged in
router.get('/', (req, res) => {
    if (req.session.userId) {
        User
            .findById(req.session.userId)
            .then(userData => res.json(userData));
    } else {
        res.json({ error: 'no one logged in' });
    }
})

// submitting user inputted credentials to be verified
// then once verified, log the user in. Else, return an error
router.post('/', (req, res) => {
    const { usernameOrEmail, password } = req.body;
    let { username, email } = '';

    if (/@{1}/g.test(usernameOrEmail)) {
        email = usernameOrEmail;
    } else {
        username = usernameOrEmail;
    }

    if (typeof username !== 'undefined') {
        User
            .findByUsername(username)
            .then(user => {
                if (username == '' || password == '') {
                    res.status(400).json({ error: 'Username and/or password cannot be blank' });
                } else {
                    const isValidPassword = bcrypt.compareSync(password, user.password_digest);

                    if (user && isValidPassword) {
                        // log the user in
                        req.session.userId = user.id;
                        res.json(user);
                    } else if (!isValidPassword) {
                        res.status(401).json({ error: 'Password is incorrect' });
                    }
                }
            });
    } else if (typeof email !== 'undefined') {
        User
            .findByEmail(email)
            .then(user => {
                // console.log(user);

                if (email == '' || password == '') {
                    res.status(400).json({ error: 'Email and/or password cannot be blank' });
                } else {
                    const isValidPassword = bcrypt.compareSync(password, user.password_digest);

                    if (user && isValidPassword) {
                        // log the user in
                        req.session.userId = user.id;
                        delete user.password_digest;
                        res.json(user)
                    } else if (!isValidPassword) {
                        res.status(401).json({ error: 'Password is incorrect' });
                    }
                }
            })
    }
})

module.exports = router;
