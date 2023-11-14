const express = require('express')

const {
    getPosts,
    getUserPosts,
    getPost,
    createPost,
    deletePost,
    updatePost
} = require('../controllers/post-controller')
const requireAuth = require('../middleware/require-auth')
const router = express.Router()

router.use(requireAuth)           // require auth for all post routes
router.get('/', getPosts)         // GET all posts for the authenticated user
router.get('/user/:id', getUserPosts)         // GET all posts for a specific user
router.get('/:id', getPost)       // GET a single post based on post id
router.post('/', createPost)      // POST a new post
router.delete('/:id', deletePost) // DELETE a post based on post id
router.patch('/:id', updatePost)  // UPDATE a post based on post id

module.exports = router
