const mongoose = require('mongoose')

const Schema = mongoose.Schema

const postSchema = new Schema({
  postName: { type: String, required: true },
  description: { type: String, required: true },
  skills: { type: String, required: true },
  user_id: { type: String, required: true },
  numberOfLikes: { type: Number, default: 0 },
  completed: { type: Boolean, default: false }
}, {
  timestamps: true
})

module.exports = mongoose.model('Post', postSchema)