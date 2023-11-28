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
  user = { username: user.username, email: user.email, aboutMe: user.aboutMe, postList: user.postList, numberOfLikes: user.numberOfLikes, numberOfPosts: user.numberOfPosts, createdAt: user.createdAt } // only include basic user info, not passwords etc

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

//put /follow/:id
const follow = async (req, res) => {
  if (req.user._id === req.params.id)                  //if ID you are trying to follow matches YOUR ID
    return res.status(200).json('Cannot follow yourself');

  try {
    let user = await User.findById(req.user._id);
    if (user.following.includes(req.params.id))         //if follow_ID is already being followed
      return res.status(200).json('Already following');

    user.following.push(req.params.id);               //add the ID to the array of people you are following
    await user.save();


    await User.findOneAndUpdate(
      { _id: req.params.id },
      { $push: { followers: req.user._id } }        //add YOUR ID to the followers array of the perosn you just followed
    );

    res.status(200).json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

//put /unfollow/:id
const unfollow = async (req, res) => {
  if (req.user._id === req.params.id)                  //if ID you are trying to unfollow matches YOUR ID
    return res.status(200).json('Cannot unfollow yourself');

  try {
    let user = await User.findById(req.user._id);
    if (!user.following.includes(req.params.id))        //if you try to unfollow a person you aren't following
      return res.status(200).json('Not following');

    let index = user.following.indexOf(req.params.id);
    user.following.splice(index);                     //remove them from your following array
    await user.save();

    let other = await User.findById(req.params.id);

    index = other.followers.indexOf(req.user._id);  //find YOUR ID in the other person's array
    other.followers.splice(index);                    //and remove you from their followers
    await other.save();

    res.status(200).json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

// Update settings for user
const updateSettings = async (req, res) => {
  const id = req.user._id

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: 'No such user' })
  }

  const user = await User.findOneAndUpdate({ _id: id },
    { settings: req.body }, {
    new: true, // Return the updated document instead of the original
    runValidators: true, // Run schema validation on the update
  }
  )

  if (!user) {
    return res.status(404).json({ error: 'No such user' })
  }

  res.status(200).json(user)
}


module.exports = { userSignup, userLogin, getProfile, getUserOwnProfile, follow, unfollow, updateSettings }