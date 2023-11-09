const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    aboutMe: { type: String, required: true },
    postList: { type: String, default: '' },
    numberOfLikes: { type: Number, default: 0 },
    numberOfPosts: { type: Number, default: 0 },
}, {
    timestamps: true,
});


const User = mongoose.model('User', userSchema);


module.exports = User;
