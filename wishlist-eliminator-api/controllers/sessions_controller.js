const express = require('express')
const router = express.Router()
const bcrypt = require('bcrypt')

// models
const User = require('../models/user')

// finding if local userId is logged in
router.get('/', (req, res) => {
    if (req.session.userId) {
        User
            .findById(req.session.userId)
            .then(userName => res.json(userName))
    } else {
        res.json({ error: 'no one logged in' })
    }
})

// submitting user inputted credentials to be verified
// then once verified, log the user in. Else, return an error
router.post('/', (req, res) => {
    const { email, password } = req.body

    User
        .findByEmail(email)
        .then(user => {
            if (email == '' || password == '') {
                res.status(400).json({ error: 'email and/or password cannot be blank' })
            } else {
                const isValidPassword = bcrypt.compareSync(password, user.password_digest)

                if (user && isValidPassword) {
                    // log the user in
                    req.session.userId = user.id
                    res.json(user)
                } else if (!isValidPassword) {
                    res.status(401).json({ error: 'password is incorrect' })
                }
            }
        })
})

module.exports = router
