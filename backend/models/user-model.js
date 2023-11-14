const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const validator = require('validator')
const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true }, // Email must be unique
  password: { type: String, required: true },
  aboutMe: { type: String, required: true },
  postList: { type: Array, default: [] },
  numberOfLikes: { type: Number, default: 0 },
  numberOfPosts: { type: Number, default: 0 },
}, {
  timestamps: true,
});

// static signup method
userSchema.statics.signup = async function (username, email, password, aboutMe) {
  // validation
  if (!username || !email || !password || !aboutMe) {
    throw Error('All fields must be filled')
  }

  //email validation and existence
  if (!validator.isEmail(email)) {
    throw Error('Email not valid')
  }

  const exists = await this.findOne({ email })

  if (exists) {
    throw Error('Email already in use')
  }

  //pasword strength check & hashing+salting
  //Password requirements: minLength: 8, minLowercase: 1, minUppercase: 1, minNumbers: 1, minSymbols: 1
  if (!validator.isStrongPassword(password)) {
    throw Error('Password not strong enough')
  }

  const salt = await bcrypt.genSalt(10) // the higher this number, the harder the password is to crack
  const hash = await bcrypt.hash(password, salt)

  //create user object
  const user = await this.create({ username, email, password: hash, aboutMe })

  return user
}

//static login method
userSchema.statics.login = async function (email, password) {

  if (!email || !password) {
    throw Error('All fields must be filled')
  }

  //run email & pswd matches
  const user = await this.findOne({ email })
  if (!user) {
    throw Error('Incorrect email')
  }
  const match = await bcrypt.compare(password, user.password)
  if (!match) {
    throw Error('Incorrect password')
  }

  return user
}

// add a new post to user
userSchema.statics.addPost = async function (userId, postId) {
  try {
    // Find the user 
    const user = await this.findOne({ _id: userId }, 'postList');
    if (!user) {
      throw new Error('User not found');
    }

    // Add new postId to the postList
    const updatedPostList = [...user.postList, postId];

    // Update the user with the new postList
    const updatedUser = await this.findByIdAndUpdate(
      userId,
      { $set: { postList: updatedPostList } },
      { new: true }
    );

    return updatedUser;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

const User = mongoose.model('User', userSchema);

module.exports = User;
