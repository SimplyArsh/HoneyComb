const mongoose = require('mongoose')
const { ObjectID } = require('mongoose').Types

const Schema = mongoose.Schema

const commentSchema = new mongoose.Schema({
  date: { type: Date, default: Date.now },
  username: { type: String, required: true },
  comment: { type: String, required: true }
});

const postSchema = new Schema({
  postName: { type: String, required: true },
  description: { type: String, required: true },
  skills: { type: String, required: true },
  user_id: { type: String, required: true },
  numberOfLikes: { type: Number, default: 0 },
  completed: { type: Boolean, default: false }, 
  usersWhoLiked: { type: [ObjectID], required: false },
  comments: { type: [commentSchema], required: false}
}, {
  timestamps: true
})

module.exports = mongoose.model('Post', postSchema)