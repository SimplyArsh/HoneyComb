const express = require('express')
const requireAuth = require('../middleware/require-auth')

// controller functions
const { userSignup, userLogin, getProfile } = require('../controllers/user-controller')
const router = express.Router()

router.post('/login', userLogin)   // login route
router.post('/signup', userSignup) // signup route
router.get('/profile/:id', getProfile)       // GET a profile, but only the basic details. Anyone can get the basic details of another person's profile

module.exports = router 