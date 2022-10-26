const express = require('express');
const app = express();
const PORT = process.env.PORT || 3001;

// Middlewares
const logger = require('./middlewares/logger');
const sessions = require('./middlewares/sessions');

// Controllers
const usersController = require('./controllers/users_controller');
const sessionsController = require('./controllers/sessions_controller');
const wishlistsController = require('./controllers/wishlists_controller');

// Starting back-end server
app.listen(PORT, () => console.log(`Wishlist Eliminator API\nServer listening on port ${PORT}`));

// Starting server logger
app.use(logger);

// Allowing server to parse JSON body during API calls/requests
app.use(express.json());

// Enables sessions
app.use(sessions);

console.log('Node environment:', process.env.NODE_ENV)

// Sending back SPA to user/client
if (process.env.NODE_ENV === 'production') {
    const path = require('path')
    app.use(express.static(path.join(__dirname, 'build')));

    app.get('/\/[^api]/', (req, res) => {
        res.sendFile(path.join(__dirname, 'build', 'index.html'));
    });
} else if (process.env.NODE_ENV === 'development') {
    const path = require('path')
    app.use(express.static(path.join(__dirname, 'wishlist-eliminator-app/build')));

    // console.log("running development")
    app.get('/\/[^api]/', (req, res) => {
        res.sendFile(path.join(__dirname, 'wishlist-eliminator-app/build', 'index.html'));
    });
}

// Route controllers
app.use('/api/users', usersController);
app.use('/api/sessions', sessionsController);
app.use('/api/wishlists', wishlistsController);

// Response is sent back to user/client
