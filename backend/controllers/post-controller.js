const Post = require('../models/post-model')
const User = require('../models/user-model')
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')

// get all posts for the authenticated user
const getPosts = async (req, res) => {
  const user_id = req.user._id
  const posts = await Post.find({ user_id }).sort({ createdAt: -1 })

  res.status(200).json(posts)
}

// get all posts for a specific user
const getUserPosts = async (req, res) => {
  const user_id = req.params.id
  const posts = await Post.find({ user_id }).sort({ createdAt: -1 })

  res.status(200).json(posts)
}

//TODO: for right now it just retrieves all the posts
const getRecomendationPosts = async (req, res) => {

  try {
    const pageSize = req.query.pageSize;
    const pageNumber = req.query.pageNumber;

    const skip = (pageNumber - 1) * pageSize;

    const result = await Post.find({}).skip(skip).limit(pageSize)

    const resultWithProfileNames = await Promise.all(result.map(async (post) => {
      const userId = post.user_id;
    
      const profileResponse = await User.findById(userId)
      
      const profileName = profileResponse.username;

      return {
        ...post._doc,
        profile_name: profileName,
      };

    }));

    res.status(200).json(resultWithProfileNames);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error: ', details:{ message: error.message } });
  }
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

const updateLikeCount = async (req, res) => {

  // checking if the user has already liked
  // user has already been authorzied, so token guarnteed at this point
  const { id } = req.params
  const user_id = req.user._id

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: 'Project doesnt exist' })
  }

  const postCheckLikeStatus = await Post.findOne({ _id: id })
  let post; 


  if (postCheckLikeStatus.usersWhoLiked.includes(user_id)) {
    // removing the like
    post = await Post.findOneAndUpdate({ _id: id }, {
      $set: {
        numberOfLikes: postCheckLikeStatus.numberOfLikes - 1,
      },
      $pull: {
        usersWhoLiked: user_id
      },
    }, {new: true}) 
  } else {
    //inserting a like
    post = await Post.findOneAndUpdate({ _id: id }, {
      $set: {
        numberOfLikes: postCheckLikeStatus.numberOfLikes + 1,
      },
      $push: {
        usersWhoLiked: user_id
      },
    }, {new: true}) 
  } 

  if (!post) {
    return res.status(400).json({ error: 'No such project post' })
  }

  res.status(200).json({ ...post._doc}) // ...post._doc, 
}



module.exports = {
  getPosts,
  getUserPosts,
  getPost,
  createPost,
  deletePost,
  updatePost,
  getRecomendationPosts,
  updateLikeCount
}