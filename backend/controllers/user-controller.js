const User = require('../models/user-model')
const jwt = require('jsonwebtoken')
const mongoose = require('mongoose')

const createToken = (_id) => {
  return jwt.sign({ _id }, process.env.SECRET, { expiresIn: '3d' })
}

//user login
const userLogin = async (req, res) => {
  const { email, password } = req.body
  try {
    const user = await User.login(email, password)

    const token = createToken(user._id) // create token
    res.status(200).json({ email, token })
  }
  catch (error) {
    res.status(400).json({ error: error.message })
  }
}

//user signup
const userSignup = async (req, res) => {
  const { username, email, password, aboutMe } = req.body
  try {
    const user = await User.signup(username, email, password, aboutMe)
    const token = createToken(user._id)
    res.status(200).json({ email, token })
  }
  catch (error) {
    res.status(400).json({ error: error.message })
  }
}

// get user own profile
const getUserOwnProfile = async (req, res) => {
  const id = req.user._id

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: 'No such user' })
  }

  let user = await User.findById(id)

  if (!user) {
    return res.status(404).json({ error: 'No such user' })
  }
  user = user._doc
  user = { username: user.username, email: user.email, aboutMe: user.aboutMe, postList: user.postList, numberOfLikes: user.numberOfLikes, numberOfPosts: user.numberOfPosts, createdAt: user.createdAt, postsLiked:user.postsLiked } // only include basic user info, not passwords etc

  res.status(200).json(user) // change this later to only include basic info
}

// get profile/:id
const getProfile = async (req, res) => {
  const { id } = req.params

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: 'No such user' })
  }

  let user = await User.findById(id)

  if (!user) {
    return res.status(404).json({ error: 'No such user' })
  }
  user = user._doc
  user = { username: user.username, email: user.email, aboutMe: user.aboutMe, postList: user.postList, numberOfLikes: user.numberOfLikes, numberOfPosts: user.numberOfPosts, createdAt: user.createdAt } // only include basic user info, not passwords etc

  res.status(200).json(user) // change this later to only include basic info
}

const updateUserLikes = async (req, res) => {

  // checking if the user has already liked
  // user has already been authorzied, so token guarnteed at this point
  const user_id = req.user._id
  const post_id = req.params.id
  

  if (!mongoose.Types.ObjectId.isValid(post_id)) {
    return res.status(404).json({ error: 'Project doesnt exist' })
  }

  if (!mongoose.Types.ObjectId.isValid(user_id)) {
    return res.status(404).json({ error: 'User doesnt exist' })
  }

  const checkUserLikeStatus = await User.findOne({ _id: user_id })
  let post; 
  let liked = null;

  if (checkUserLikeStatus.postsLiked.includes(post_id)) {
    // removing the like
    console.log("User unliked")
    liked = false; 
    post = await User.findOneAndUpdate({ _id: user_id }, {
      $set: {
        numberOfLikes: checkUserLikeStatus.numberOfLikes - 1,
      },
      $pull: {
        postsLiked: post_id
      },
    }, {new: true}) 
  } else {
    //inserting a like
    liked = true; 
    console.log("User liked")
    post = await User.findOneAndUpdate({ _id: user_id }, {
      $set: {
        numberOfLikes: checkUserLikeStatus.numberOfLikes - 1,
      },
      $push: {
        postsLiked: post_id
      },
    }, {new: true}) 
  } 


  if (!post) {
    return res.status(400).json({ error: 'There was an internal error updating the user information' })
  }

  res.status(200).json({ ...post._doc, liked: liked }) // ...post._doc, 
}

module.exports = { userSignup, userLogin, getProfile, getUserOwnProfile, updateUserLikes }