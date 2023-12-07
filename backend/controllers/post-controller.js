const { Post, Comment } = require('../models/post-model')
const User = require('../models/user-model')
const mongoose = require('mongoose')

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
    const userId = req.query.userId

    console.log(req.query.pageSize, req.query.pageNumber, req.query.userId);

    const skip = (pageNumber) * pageSize;

    const result = await Post.find({'user_id': {$ne: userId}}, '-comments').sort({_id:-1}).skip(skip).limit(pageSize)

    const resultWithProfileNames = await Promise.all(result.map(async (post) => {
      const userId = post.user_id;

      const profileResponse = await User.findById(userId)

      return {
        ...post._doc,
        profile_name: profileResponse.username,
        profile_user_avatar:profileResponse.avatarNumber 
      };

    }));

    res.status(200).json(resultWithProfileNames);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error: ', details: { message: error.message } });
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
      postName: postName,
      description: description,
      skills: skills,
      user_id: user_id
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
    }, { new: true })
  } else {
    //inserting a like
    post = await Post.findOneAndUpdate({ _id: id }, {
      $set: {
        numberOfLikes: postCheckLikeStatus.numberOfLikes + 1,
      },
      $push: {
        usersWhoLiked: user_id
      },
    }, { new: true })
  }

  if (!post) {
    return res.status(400).json({ error: 'No such project post' })
  }

  res.status(200).json({ ...post._doc }) // ...post._doc, 
}

// this function recursively fetches all the nested comments in the post
// const populateComments = async (comment) => {
//   let response = []
//   await Promise.all(comment.comments.map( async (replies) => {
//     const replyFetched = await Comment.findById(replies).populate('comments')
//     response.push(replyFetched)
//   }));
//   console.log(response[0])
//   return response
// }

// this is a non-optimized brute force method to recover all comments recursively. 
// autopoopulate & schmea refactoring are better options but i can not get them to work. 
const populateComments = async (comment) => {
  let response = []
  if (comment !== null) {
    await Promise.all(comment?.comments?.map(async (reply_ids) => {
      const replyFetched = await Comment.findById(reply_ids).lean()
      replyFetched.comments = await populateComments(replyFetched)
      // console.log(replyFetched)
      response.push(replyFetched)
    }));
  }
  return response
}

//get comments for a single post
const getCommentsForPost = async (req, res) => {

  try {
    const post_id = new mongoose.Types.ObjectId(req.params.id)
    if (!post_id) {
      return res.status(404).json({ error: 'BRO Post id passed in is undefined' })
    }

    const post = await Post.findById(post_id)

    if (!post) {
      return res.status(404).json({ error: 'BRO Post could not be found' })
    }

    const response = await populateComments(post)
    // console.log(response[0].comments)

    res.status(200).json(response)
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Internal Server Error' })
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
      return res.status(404).json({ error: 'BRO Comment fields not filled' })
    }

    const userId = req.user._id

    // mongoose doc recomends using lean b/c it's responds w/ a cheaper obj
    const user = await User.find(userId).lean()
    if (!user) {
      return res.status(404).json({ error: 'BRO userId was undefined' })
    }

    const newComment = await Comment.create({
      username: user[0].username,
      user_id: userId,
      comment: comment
    })
    if (!newComment) {
      return res.status(404).json({ error: 'BRO comment could not be created' })
    }

    // need to convert from string to Object (object is the native type)
    // for ID types in mongoose 
    var commentOrPostId = new mongoose.Types.ObjectId(parentCommentId)
    if (idSelect === 0) {
      // adds to a comment (i.e. this is a reply)
      const updateParentComment = await Comment.findOne(commentOrPostId)
      if (!updateParentComment) {
        return res.status(404).json({ error: 'BRO could not add comment to comment' })
      }
      updateParentComment.comments.push(newComment._id)
      await updateParentComment.save()

      res.status(200).json(newComment)
    } else {
      // adds to a post (i.e. this is direct comment)
      const parentPost = await Post.findOne(commentOrPostId)
      if (!parentPost) {
        return res.status(404).json({ error: 'BRO could not add comment to parent' })
      }
      parentPost.comments.push(newComment._id)
      await parentPost.save()

      res.status(200).json(newComment) // tells us that the comment was added successfully
    }

  } catch (error) {
    console.log(error)
  }

}

// recursively deletes all replies when a comment is deleted
// this recursive function has the more optimized performance, however, it doesnt work ):
// if someone wants to debug they can
// const deleteCommentThread = async (comment) => {

//   try {
//     const commentId = new mongoose.Types.ObjectId(comment)
//     const commentFound = await Comment.findOne(commentId).lean()
//     console.log("comment:", commentFound)

//     commentFound.comments.forEach(async (reply) => {
//       console.log("replyId: ", reply)
//       await deleteCommentThread(reply)
//     })

//     const deletedPost = await Comment.findOneAndDelete(commentId).lean()
//     if (!deletedPost) {
//       return res.status(404).json({ error: 'BRO Could not find comment to delete'})
//     }
//   } catch (error) {
//     res.status(404).json({ error: "There was an error"})
//   }
// }

const deleteCommentsRecursively = async (aPostId, deleteChainStart, comment, commentDeleteId) => {
  if (comment !== null) {
    await Promise.all(comment?.comments?.map(async (reply_ids) => {
      const replyFetched = await Comment.findById(reply_ids).lean()
      // console.log("ReplyId: ", reply_ids, " and Comment Delete ID is: ", commentDeleteId)
      var deleteChainNew = deleteChainStart
      if (reply_ids.equals(commentDeleteId)) {
        deleteChainNew = true
        if (aPostId) {
          // console.log("from the prev one: ", comment._id, " deleting: ", reply_ids)
          await Post.findOneAndUpdate(comment._id, { $pull: { comments: reply_ids } })
        } else {
          // console.log("from the prev one: ", comment._id, " deleting: ", reply_ids)
          await Comment.findOneAndUpdate(comment._id, { $pull: { comments: reply_ids } }) // we are pulling reply id from the comment just above
        }
      }
      await deleteCommentsRecursively(false, deleteChainNew, replyFetched, commentDeleteId)
      if (deleteChainNew) {
        // console.log("In recursive delete: ", replyFetched.comment, reply_ids, deleteChainNew)
        await Comment.findOneAndDelete(reply_ids)
      }
    }));
  }
}

const deleteComment = async (req, res) => {
  try {

    const commentId = new mongoose.Types.ObjectId(req.query.commentId)

    if (!commentId) {
      return res.status(404).json({ error: 'BRO Post id passed is undefined' })
    }

    const postParentId = new mongoose.Types.ObjectId(req.query.postParentId)
    const post = await Post.findById(postParentId).lean()

    //recursively deletes the comment, deletes the replies, removes any references to the comments to other objects O(n^1000) i think. yeah, ik. but stfu
    await deleteCommentsRecursively(true, false, post, commentId)

    res.status(200).json({ sucess: "ok!" })
  } catch (error) {
    console.log(error)
  }

}

//editing a comment
const editComment = async (req, res) => {

  const editCommentId = new mongoose.Types.ObjectId(req.body.id)
  try {

    const CommentToEdit = await Comment.updateOne({_id: editCommentId}, 
      { comment: req.body.editedComment})
    
    res.status(200)
  } catch (error) {
    res.status(404).json({ error: "There was some error in editing the comment" })
  }
}
const getSearchedPosts = async (req, res) => {
  try {
    const pageSize = req.query.pageSize;
    const pageNumber = req.query.pageNumber;

    const lookup = req.query.lookup;

    const skip = (pageNumber - 1) * pageSize;

    const result = await Post.find({ postName: lookup }, '-comments').skip(skip).limit(pageSize);

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
    res.status(500).json({ error: 'Internal Server Error: ', details: { message: error.message } });
  }
}


module.exports = {
  getPosts,
  getUserPosts,
  getPost,
  createPost,
  deletePost,
  updatePost,
  getSearchedPosts,
  getRecomendationPosts,
  updateLikeCount,
  getCommentsForPost,
  addComment,
  deleteComment,
  editComment
}