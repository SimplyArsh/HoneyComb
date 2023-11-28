const {Post, Comment} = require('../models/post-model')
const User = require('../models/user-model')
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const { post } = require('../routes/post')

// get all posts for the authenticated user
const getPosts = async (req, res) => {
  const user_id = req.user._id
  const posts = await Post.find({ user_id }).sort({ createdAt: -1 })

  res.status(200).json(posts)
}

// get all posts for a specific user
const getUserPosts = async (req, res) => {
  const user_id = req.params.id
  const posts = await Post.find({ user_id }).sort({ createdAt: -1 })

  res.status(200).json(posts)
}

//TODO: for right now it just retrieves all the posts
const getRecomendationPosts = async (req, res) => {
  try {
    const pageSize = req.query.pageSize;
    const pageNumber = req.query.pageNumber;

    const skip = (pageNumber - 1) * pageSize;

    const result = await Post.find({}, '-comments').skip(skip).limit(pageSize)
    
    const resultWithProfileNames = await Promise.all(result.map(async (post) => {
      const userId = post.user_id;
      
      const profileResponse = await User.findById(userId)
      
      const profileName = profileResponse.username;

      return {
        ...post._doc,
        profile_name: profileName,
      };

    }));

    res.status(200).json(resultWithProfileNames);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error: ', details:{ message: error.message } });
  }
}

// get a single project post
const getPost = async (req, res) => {
  const { id } = req.params
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: 'No such project post' })
  }

  const post = await Post.findById(id)

  if (!post) {
    return res.status(404).json({ error: 'No such project post' })
  }

  res.status(200).json(post)
}


// create new project post
const createPost = async (req, res) => {
  const { postName, description, skills } = req.body

  let emptyFields = []

  if (!postName) {
    emptyFields.push('postName')
  }
  if (!description) {
    emptyFields.push('description')
  }
  if (!skills) {
    emptyFields.push('skills')
  }
  if (emptyFields.length > 0) {
    return res.status(400).json({ error: 'Please fill in all the fields', emptyFields })
  }

  // add doc to db
  try {
    // create post 
    const user_id = req.user._id
    const post = await Post.create({ 
      postName:postName,
      description:description,
      skills:skills,
      user_id:user_id
     })

    res.status(200).json(post)
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}

// delete a project post
const deletePost = async (req, res) => {
  const { id } = req.params
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: 'No such project post' })
  }

  const post = await Post.findOneAndDelete({ _id: id })

  if (!post) {
    return res.status(400).json({ error: 'No such project post' })
  }

  res.status(200).json(post)
}

// update a post
const updatePost = async (req, res) => {
  const { id } = req.params
  console.log(id)
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: 'No such project post' })
  }
  const post = await Post.findOneAndUpdate({ _id: id }, {
    ...req.body
  })

  if (!post) {
    return res.status(400).json({ error: 'No such project post' })
  }

  res.status(200).json(post)
}

const updateLikeCount = async (req, res) => {

  // checking if the user has already liked
  // user has already been authorzied, so token guarnteed at this point
  const { id } = req.params
  const user_id = req.user._id

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: 'Project doesnt exist' })
  }

  const postCheckLikeStatus = await Post.findOne({ _id: id })
  let post; 


  if (postCheckLikeStatus.usersWhoLiked.includes(user_id)) {
    // removing the like
    post = await Post.findOneAndUpdate({ _id: id }, {
      $set: {
        numberOfLikes: postCheckLikeStatus.numberOfLikes - 1,
      },
      $pull: {
        usersWhoLiked: user_id
      },
    }, {new: true}) 
  } else {
    //inserting a like
    post = await Post.findOneAndUpdate({ _id: id }, {
      $set: {
        numberOfLikes: postCheckLikeStatus.numberOfLikes + 1,
      },
      $push: {
        usersWhoLiked: user_id
      },
    }, {new: true}) 
  } 

  if (!post) {
    return res.status(400).json({ error: 'No such project post' })
  }

  res.status(200).json({ ...post._doc}) // ...post._doc, 
}

// this function recursively fetches all the nested comments in the post
const populateComments = async (comment) => {
  await comment.populate('comments');

  const response = []
  comment.comments.forEach( async (comment) => {
    const expandedReplies = await Comment.findById(comment._id)
    console.log(expandedReplies)
    response.push(expandedReplies)
  });

  console.log(response)
  return response
}

//get comments for a single post
const getCommentsForPost = async (req, res) => {

  try {
    const post_id = new mongoose.Types.ObjectId(req.params.id)
    if (!post_id) {
      return res.status(404).json({ error: 'BRO Post id passed in is undefined'})
    }

    const post = await Post.findById(post_id)

    if (!post) {
      return res.status(404).json({ error: 'BRO Post could not be found'})
    }

    const response = await populateComments(post)
    // console.log(response)

    res.status(200).json({ comments: post.comments})
  } catch (error) {
    console.error(error)
    res.status(500).json({error: 'Internal Server Error'})
  }
}

  
  // add a comment to a post
  const addComment = async (req, res) => {

    const comment = req.body.comment 
    /* parentCommentId contains either the parent comment,
    or if doesn't exist, the post; selected by the idSelect part
    of the query */
    const parentCommentId = req.query.parentCommentId 
    const idSelect = parseInt(req.query.idSelect) // string -> int

    try {
      if (!comment) {
        return res.status(404).json({ error: 'BRO Comment fields not filled'})
      }

      const userId = req.user._id 

      // mongoose doc recomends using lean b/c it's responds w/ a cheaper obj
      const user = await User.find(userId).lean()
      if (!user) {
        return res.status(404).json({ error: 'BRO userId was undefined'})
      }

      const newComment = await Comment.create({
        username: user[0].username, 
        user_id: userId,
        comment: comment
      })
      if (!newComment) {
        return res.status(404).json({ error: 'BRO comment could not be created'})
      }

      // need to convert from string to Object (object is the native type)
      // for ID types in mongoose 
      var commentOrPostId = new mongoose.Types.ObjectId(parentCommentId)
      if (idSelect === 0) {
        // adds to a comment (i.e. this is a reply)
        const updateParentComment = await Comment.findOne(commentOrPostId)
        if (!updateParentComment) {
          return res.status(404).json({ error: 'BRO could not add comment to comment'})
        }
        updateParentComment.comments.push(newComment._id)
        await updateParentComment.save()

      } else {
        // adds to a post (i.e. this is direct comment)
        const parentPost = await Post.findOne(commentOrPostId)
        if (!parentPost) {
          return res.status(404).json({ error: 'BRO could not add comment to parent'})
        }
        parentPost.comments.push(newComment._id)
        await parentPost.save()

        res.status(200) // tells us that the comment was added successfully
      }

    } catch (error) {
      console.log(error)
    }

  }

  // recursively deletes all replies when a comment is deleted
  const deleteCommentThread = async (comment) => {

    try {
      const commentId = new mongoose.Types.ObjectId(comment)
      const commentFound = await Comment.findOne(commentId).lean()
      console.log("comment:", commentFound)

      commentFound.comments.forEach(async (reply) => {
        console.log("replyId: ", reply)
        deleteCommentThread(reply)
      })

      const deletedPost = await Comment.findOneAndDelete(commentId).lean()
      if (!deletedPost) {
        return res.status(404).json({ error: 'BRO Could not find comment to delete'})
      }
    } catch (error) {
      res.status(404).json({ error: "There was an error"})
    }
  }

  const deleteComment = async (req, res) => {
    console.log("here")
    try {

      const commentId = new mongoose.Types.ObjectId(req.params.id)
      if (!commentId) {
        return res.status(404).json({ error: 'BRO Post id passed is undefined'})
      }
      console.log(commentId)
      deleteCommentThread(commentId)

      res.status(200)
    } catch (error) {
      console.log(error)
    }

  }

  //editing a comment
  const editComment = async (req, res) => {

    const editCommentId = new mongoose.Types.ObjectId(req.body.id)
    try {
      console.log("here")
      const CommentToEdit = await Comment.findOneAndUpdate(editCommentId)
      
      CommentToEdit.comment = req.body.editedComment
      CommentToEdit.save()

      res.status(200)
    } catch (error) {
      res.status(404).json({ error:"There was some error in editing the comment"})
    }
  }

module.exports = {
  getPosts,
  getUserPosts,
  getPost,
  createPost,
  deletePost,
  updatePost,
  getRecomendationPosts,
  updateLikeCount,
  getCommentsForPost,
  addComment,
  deleteComment,
  editComment
}