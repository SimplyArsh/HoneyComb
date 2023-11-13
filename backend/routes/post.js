const express = require('express')

const {
    getPosts,
    getPost,
    createPost,
    deletePost,
    updatePost,
    getRecomendationPosts
} = require('../controllers/post-controller')
const requireAuth = require('../middleware/require-auth')
const router = express.Router()

router.use(requireAuth)           // require auth for all post routes
router.get('/', getPosts)         // GET all posts
router.get('/:id', getPost)       //GET a single post
router.post('/', createPost)      // POST a new post
router.delete('/:id', deletePost) // DELETE a post
router.patch('/:id', updatePost)  // UPDATE a post
router.get('/recomendations', getRecomendationPosts)

module.exports = router
