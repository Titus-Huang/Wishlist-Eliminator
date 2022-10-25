const db = require('../db/db');

const User = {
    create: (username, email, passwordDigest) => {
        const sql = `
            INSERT INTO users (username, email, password_digest, user_type)
            VALUES ($1, $2, $3, 'user')
            RETURNING *
        `;

        return db
            .query(sql, [username, email, passwordDigest])
            .then(dbRes => {
                let userData = dbRes.rows[0];
                if (typeof userData !== 'undefined') delete userData.password_digest;
                return userData;
            });
    },

    updateSteamId: (id, steamId) => {
        const sql = `
            UPDATE users
            SET steam_id = $2
            WHERE id = $1
            RETURNING *
        `;

        return db
            .query(sql, [id, steamId])
            .then(dbRes => dbRes.rows[0]);
    },

    findByEmail: email => {
        const sql = `
            SELECT * FROM users
            WHERE email = $1
        `
    
        return db
            .query(sql, [email])
            .then(dbRes => dbRes.rows[0]);
    },

    findByUsername: username => {
        const sql = `
            SELECT * FROM users
            WHERE username = $1
        `
    
        return db
            .query(sql, [username])
            .then(dbRes => dbRes.rows[0]);
    },

    findById: id => {
        const sql = `
            SELECT * FROM users
            WHERE id = $1
        `

        return db
            .query(sql, [id])
            .then(dbRes => {
                let userData = dbRes.rows[0];
                if (typeof userData !== 'undefined') delete userData.password_digest;
                return userData;
            });
    }

    // future capability to:
    // - update username
    // - update display name
    // - CHECK if username already exists
    // - CHECK if email already exists
}

module.exports = User;
