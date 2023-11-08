// Libraries

const Workout = require('../models/workout-model')
const mongoose = require('mongoose')

// get all workouts
const getWorkouts = async (req, res) => {
    const workouts = await Workout.find({}).sort({ createdAt: -1 }) // newest ones at the top
    res.status(200).json(workouts)
}

// get a single workout
const getWorkout = async (req, res) => {
    const { id } = req.params // get the id property from the rouute parameters

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'No such workout' }) // check if id form is valid
    }

    const workout = await Workout.findById(id) // get the workout

    if (!workout) { // return error if workout does not exist
        return res.status(404).json({ error: 'No such workout' }) // return so that the rest of the code isn't executed
    }

    res.status(200).json(workout) // return workout if found
}

// create a new workout
const createWorkout = async (req, res) => {
    const { title, load, reps } = req.body // access req data
    emptyFields = [] // Create custom error message

    if (!title) {
        emptyFields.push('title')
    }
    if (!load) {
        emptyFields.push('load')
    }
    if (!reps) {
        emptyFields.push('reps')
    }
    if (emptyFields.length > 0) {
        return res.status(400).json({ error: 'Please fill in all the fields', emptyFields })
    }

    try {
        const workout = await Workout.create({ title, load, reps }) // create object and add to db
        res.status(200).json(workout)
    }
    catch (error) {
        res.status(400).json({ error: error.message })
    }
}

// delete a workout
const deleteWorkout = async (req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'No such workout' }) // check if id form is valid
    }

    const workout = await Workout.findOneAndDelete({ _id: id })

    if (!workout) { // return error if workout does not exist
        return res.status(404).json({ error: 'No such workout' }) // return so that the rest of the code isn't executed
    }

    res.status(200).json(workout) // response is the deleted document
}

// update a workout
const updateWorkout = async (req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'No such workout' }) // check if id form is valid
    }

    const workout = await Workout.findOneAndUpdate({ _id: id }, {
        ...req.body
    }) // replace doc

    if (!workout) { // return error if workout does not exist
        return res.status(404).json({ error: 'No such workout' }) // return so that the rest of the code isn't executed
    }

    res.status(200).json(workout)
}

// Export functions for routers to use
module.exports = {
    getWorkouts,
    getWorkout,
    createWorkout,
    deleteWorkout,
    updateWorkout
}