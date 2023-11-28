const express = require('express')

const {
    getPosts,
    getUserPosts,
    getPost,
    createPost,
    deletePost,
    updatePost,
    getRecomendationPosts,
    updateLikeCount,
    getCommentsForPost,
    addComment,
    deleteComment,
    editComment
} = require('../controllers/post-controller')
const requireAuth = require('../middleware/require-auth')
const router = express.Router()


router.use(requireAuth)           // require auth for all post routes
router.patch('/like/:id', updateLikeCount)

// PATCH
router.patch('/editComment', editComment) // patch a comment

//GETS
router.get('/recomendations', getRecomendationPosts)
router.get('/comments/:id', getCommentsForPost) // GETS all comments for a post
router.get('/', getPosts)         // GET all posts
router.get('/user/:id', getUserPosts)         // GET all posts for a specific user
router.get('/:id', getPost)       // GET a single post based on post id

// POSTS
router.post('/', createPost)      // POST a new post
router.post('/addComment', addComment)   

//OTHERS
router.delete('/:id', deletePost) // DELETE a post based on post id
router.patch('/:id', updatePost)  // UPDATE a post based on post id

router.delete('/deleteComment/:id', deleteComment) //Delete a comment (all the replies delete with it)




module.exports = router
