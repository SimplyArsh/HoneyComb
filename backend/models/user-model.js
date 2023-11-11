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
  console.log(username, email, password, aboutMe)
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

const User = mongoose.model('User', userSchema);

module.exports = User;
