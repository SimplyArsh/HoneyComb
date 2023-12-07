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
  user = { username: user.username, email: user.email, aboutMe: user.aboutMe, postList: user.postList, numberOfLikes: user.numberOfLikes, numberOfPosts: user.numberOfPosts, createdAt: user.createdAt, postsLiked: user.postsLiked, userId: id } // only include basic user info, not passwords etc

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
    liked = false;
    post = await User.findOneAndUpdate({ _id: user_id }, {
      $set: {
        numberOfLikes: checkUserLikeStatus.numberOfLikes - 1,
      },
      $pull: {
        postsLiked: post_id
      },
    }, { new: true })
  } else {
    //inserting a like
    liked = true;
    post = await User.findOneAndUpdate({ _id: user_id }, {
      $set: {
        numberOfLikes: checkUserLikeStatus.numberOfLikes + 1,
      },
      $push: {
        postsLiked: post_id
      },
    }, { new: true })
  }


  if (!post) {
    return res.status(400).json({ error: 'There was an internal error updating the user information' })
  }

  res.status(200).json({ ...post._doc, liked: liked }) // ...post._doc, 
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

// Get settings for user
const getSettings = async (req, res) => {
  const id = req.user._id

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: 'No such user' })
  }

  let user = await User.findById(id)

  if (!user) {
    return res.status(404).json({ error: 'No such user' })
  }
  user = user._doc
  user = user.settings // only include basic user info, not passwords etc

  res.status(200).json(user) // change this later to only include basic info
}


module.exports = { userSignup, userLogin, getProfile, getUserOwnProfile, updateUserLikes, follow, unfollow, updateSettings, getSettings }