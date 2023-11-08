// Libraries

const express = require('express')
const { getWorkouts, getWorkout, createWorkout, deleteWorkout, updateWorkout } = require('../controllers/workout-controller')

// Set up router. When the server imports this file, it can access the router info we describe here.
const router = express.Router()

// GET all workouts
router.get('/', getWorkouts)

// GET a single workout
router.get('/:id', getWorkout)

// POST a new workout
router.post('/', createWorkout)

// DELETE a workout
router.delete('/:id', deleteWorkout)

// UPDATE a workout
router.patch('/:id', updateWorkout)

// Export router for other file to use
module.exports = router