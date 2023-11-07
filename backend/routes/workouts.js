// Libraries

const express = require('express')


// Set up router. When the server imports this file, it can access the router info we describe here.
const router = express.Router()

// GET all workouts
router.get('/', (req, res) => {
    res.json({ mssg: 'Get all workouts' })
})

// GET a single workout
router.get('/:id', (req, res) => {
    res.json({ mssg: 'GET a single workout' })
})

// POST a new workout
router.post('/', (req, res) => {
    res.json({ mssg: 'POST a new workout' })
})

// DELETE a workout
router.delete('/:id', (req, res) => {
    res.json({ mssg: 'DELETE new workout' })
})

// UPDATE a workout
router.patch('/:id', (req, res) => {
    res.json({ mssg: 'UPDATE new workout' })
})

// Export router for other file to use
module.exports = router