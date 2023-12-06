const express = require('express')

const {
    getPosts,
    getUserPosts,
    getPost,
    createPost,
    deletePost,
    updatePost,
    searchPosts,
    getRecomendationPosts,
    updateLikeCount,
    getCommentsForPost,
    addComment,
    deleteComment,
    editComment,
    getSearchedPosts
} = require('../controllers/post-controller')
const requireAuth = require('../middleware/require-auth')
const router = express.Router()


router.use(requireAuth)           // require auth for all post routes
router.patch('/like/:id', updateLikeCount)

// PATCH
router.patch('/editComment', editComment) // patch a comment

//GETS
router.get('/recomendations', getRecomendationPosts)
router.get('/find', getSearchedPosts)        //perform a search of posts and GET them
router.get('/user/:id', getUserPosts)         // GET all posts for a specific user
router.get('/comments/:id', getCommentsForPost) // GETS all comments for a post
router.get('/:id', getPost)       // GET a single post based on post id
router.get('/', getPosts)         // GET all posts

// POSTS
router.post('/create', createPost)      // POST a new post
router.post('/addComment', addComment)   // POSTS a new comment

// this is intentionally a patch comment, because we are both patching & deleting
// i.e. if the comment is a root comment, then we also have to remove it from the post's comment IDs
router.patch('/deleteComment', deleteComment) //Delete a comment (all the replies delete with it)

//OTHERS
router.delete('/:id', deletePost) // DELETE a post based on post id
router.patch('/:id', updatePost)  // UPDATE a post based on post id


module.exports = router
