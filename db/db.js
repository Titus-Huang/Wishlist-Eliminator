const pg = require('pg');

const localDbName = 'wishlist_eliminator_db';

// the "password" key is only for Ubuntu users
// we should hide the password, by using environment variables (we will do this later in the week, so for now use a dummy password like "test" cause it will be committed to git.)
let db;
if (process.env.DATABASE_URL) {
    db = new pg.Pool({
        connectionString: process.env.DATABASE_URL,
        ssl: {
            rejectUnauthorized: false
        }
    });
} else {
    if (process.env.DB_PASSWORD) {
        db = new pg.Pool({
            database: localDbName,
            password: process.env.DB_PASSWORD
        });
    } else {
        db = new pg.Pool({
            database: localDbName
        });
    };
}

module.exports = db;
