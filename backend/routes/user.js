const express = require('express')
const requireAuth = require('../middleware/require-auth')

// controller functions

const { userSignup, userLogin, getProfile, getUserOwnProfile, updateUserLikes, follow, unfollow, updateSettings, getSettings } = require('../controllers/user-controller')

const router = express.Router()

router.post('/login', userLogin)   // login route
router.post('/signup', userSignup) // signup route


router.use(requireAuth)           // require auth for viewing profiles
router.patch('/updateLikes/:id', updateUserLikes)
router.get('/profile', getUserOwnProfile)       // GET a user's own profile, but only the basic details
router.get('/profile/:id', getProfile)       // GET a specific profile, but only the basic details
router.get('/settings', getSettings) // GET the user settings

router.put("/follow/:id", follow)      //follow another user(id). appends YOUR ID(_id) to the followers array of the other user
router.put("/unfollow/:id", unfollow)  //unfollow another user(id). removes YOUR ID(_id) from the followers array of the other user

router.patch("/settings", updateSettings) // update settings for the user 

module.exports = router