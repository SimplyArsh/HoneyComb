const express = require('express')
const requireAuth = require('../middleware/require-auth')

// controller functions
const { userSignup, userLogin, getProfile, getUserOwnProfile } = require('../controllers/user-controller')
const router = express.Router()

router.post('/login', userLogin)   // login route
router.post('/signup', userSignup) // signup route

router.use(requireAuth)           // require auth for viewing profiles
router.get('/profile', getUserOwnProfile)       // GET a user's own profile, but only the basic details
router.get('/profile/:id', getProfile)       // GET a specific profile, but only the basic details

module.exports = router 