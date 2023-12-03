const mongoose = require('mongoose')
const { ObjectID } = require('mongoose').Types

const Schema = mongoose.Schema


const commentSchema = new Schema({
  date: { type: Date, default: Date.now },
  username: { type: String, required: true },
  user_id: { type: String, required: true },
  comment: { type: String, required: true }, // the comment itself
  comments: { 
    type: [ObjectID],
    // ref:"Comment",
    // autopopulate: true, 
    required: false
  } // the nested comments
});

const postSchema = new Schema({
  postName: { type: String, required: true },
  description: { type: String, required: true },
  skills: { type: String, required: true },
  user_id: { type: String, required: true },
  numberOfLikes: { type: Number, default: 0 },
  completed: { type: Boolean, default: false }, 
  usersWhoLiked: { type: [ObjectID], required: false },
  comments: { type: [ObjectID], ref:"Comment", required: false}
}, {
  timestamps: true
})

const Post = mongoose.model('Post', postSchema)
const Comment = mongoose.model('Comment', commentSchema)

module.exports = { Post: Post, Comment: Comment}