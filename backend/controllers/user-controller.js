const User = require('../models/user-model')
const jwt = require('jsonwebtoken')
const createToken = (_id) => {
  return jwt.sign({ _id }, process.env.SECRET, { expiresIn: '3d' })
}

//user login
const userLogin = async (req, res) => {
  const { email, password } = req.body
  try {
    const user = await User.login(email, password)
    const token = createToken(user._id) //create token
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

module.exports = { userSignup, userLogin }