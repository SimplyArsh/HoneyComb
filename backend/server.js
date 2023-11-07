// Libraries

require('dotenv').config() // allows you to customize your own environment. Anything later in the code that begins with process.env is part of this library. This is useful for hiding your passwords etc. Do npm install dotenv to set things up

const express = require('express') // express allows us to do routings easily. e.g. app.use(...) is part of express
const mongoose = require('mongoose') // mongoose allows us to interact with MongoDB easily
const workoutRoutes = require('./routes/workouts') // routing information. I called it workoutRoutes because I'm following the tutorial. We should name it something else like loginRoutes or searchRoutes depending on the route we are looking at

// express app
const app = express()

// middleware
app.use(express.json()) // Grants access to req.body
app.use((req, res, next) => {
    console.log(req.path, req.method)
    next()
}) // prints the path and method for the incoming request. For debugging purposes.

// routes
app.use('/api/workouts', workoutRoutes) // i.e. for any link that contains /api/workouts, decide what to do based on workoutRoutes

// connect to db
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        // listen for requests only after connecting to db
        app.listen(process.env.PORT, () => {
            console.log("connected to db & listening at port 4000!!!")
        })
    })
    .catch((error) => {
        console.log(error)
    })


