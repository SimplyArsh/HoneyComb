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

// get profile
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

module.exports = { userSignup, userLogin, getProfile }