const express = require('express')
const app = express()
const PORT = process.env.PORT || 3001

app.listen(PORT, () => console.log(`Server listening on port ${PORT}`))

app.use(express.json())

// You can replace this with a database
let database = []

// Routes
app.get('/database', (req, res) => {
    res.json({ database })
})

app.post('/database', (req, res) => {
    database = req.body.database
    res.json({ database })
})


if (process.env.NODE_ENV === 'production') {
    const path = require('path')
    app.use(express.static(path.join(__dirname, 'build')));

    app.get('/*', (req, res) => {
        res.sendFile(path.join(__dirname, 'build', 'index.html'));
    });
}
