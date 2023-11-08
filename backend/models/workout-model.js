// Libraries

const mongoose = require('mongoose')

// Schema allows us to define the structure of a document in the database

const Schema = mongoose.Schema

const workoutSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    reps: {
        type: Number,
        required: true
    },
    load: {
        type: Number,
        required: true
    }
}, { timestamps: true }) // automatically include data on when the model was created and updated

// Models apply the schema to a particular model. We use that model to interact with a collection of that name. By captializing Workout, a database of Workouts is automatically created 

module.exports = mongoose.model('Workout', workoutSchema)