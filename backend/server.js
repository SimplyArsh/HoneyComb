const express = require('express')

// express app
const app = express()

// routes
app.get('/', (req, res) => {
    res.json({ mssg: 'Welcome to the app' })
})

// listen for requests
app.listen(4000, () => {
    console.log("listening at port 4000!!!")
})