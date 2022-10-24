const db = require('../db/db');

const User = {
    create: (username, email, passwordDigest) => {
        const sql = `
            INSERT INTO users (username, email, password_digest)
            VALUES ($1, $2, $3)
            RETURNING *
        `;

        return db
            .query(sql, [username, email, passwordDigest])
            .then(dbRes => dbRes.rows[0]);
    }
}

module.exports = User;
