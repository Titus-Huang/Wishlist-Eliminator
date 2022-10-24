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
                delete userData.password_digest;
                return userData;
            });
    }
}

module.exports = User;
