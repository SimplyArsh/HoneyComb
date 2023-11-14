const Post = require('../models/post-model')
const mongoose = require('mongoose')

// get all posts
const getPosts = async (req, res) => {
  const user_id = req.user._id
  const posts = await Post.find({ user_id }).sort({ createdAt: -1 })

  res.status(200).json(posts)
}

// get a single project post
const getPost = async (req, res) => {
  const { id } = req.params

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: 'No such project post' })
  }

  const post = await Post.findById(id)

  if (!post) {
    return res.status(404).json({ error: 'No such project post' })
  }

  res.status(200).json(post)
}


// create new project post
const createPost = async (req, res) => {
  const { postName, description, skills } = req.body

  let emptyFields = []

  if (!postName) {
    emptyFields.push('postName')
  }
  if (!description) {
    emptyFields.push('description')
  }
  if (!skills) {
    emptyFields.push('skills')
  }
  if (emptyFields.length > 0) {
    return res.status(400).json({ error: 'Please fill in all the fields', emptyFields })
  }

  // add doc to db
  try {
    // create post 
    const user_id = req.user._id
    const post = await Post.create({ postName, description, skills, user_id })

    res.status(200).json(post)
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}

// delete a project post
const deletePost = async (req, res) => {
  const { id } = req.params
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: 'No such project post' })
  }

  const post = await Post.findOneAndDelete({ _id: id })

  if (!post) {
    return res.status(400).json({ error: 'No such project post' })
  }

  res.status(200).json(post)
}

// update a post
const updatePost = async (req, res) => {
  const { id } = req.params

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: 'No such project post' })
  }

  const post = await Post.findOneAndUpdate({ _id: id }, {
    ...req.body
  })

  if (!post) {
    return res.status(400).json({ error: 'No such project post' })
  }

  res.status(200).json(post)
}

module.exports = {
  getPosts,
  getPost,
  createPost,
  deletePost,
  updatePost
}