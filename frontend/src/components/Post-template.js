import React, { useState, useEffect } from 'react';
import Comment from "../components/Comments"
import useNode from "../hooks/comment-node.js"
import { useAuthContext } from '../hooks/use-auth-context'

const PostCard = ({
  post, 
  handleLike,
  color,
  userId
}) => {
  const { insertNode, editNode, deleteNode } = useNode();
  const [comments, setComments] = useState(null) // sets all comments for a post
  const [openCommentPanel, setOpenCommentPanel] = useState(false)
  const { user } = useAuthContext()

  const handleInsertNode = async (commentId, item) => {
    var parentSelector = 0
    if (commentId === 1) {
      parentSelector = 1
      commentId = post._id
    }
    const finalStructure = await insertNode(comments, parentSelector, commentId, item);
    console.log("Final Structure", finalStructure)
    setComments(finalStructure);
  }

  const handleEditNode = async (folderId, value) => {
    const finalStructure = await editNode(comments, folderId, value);
    setComments(finalStructure);
    console.log(finalStructure)
  }

  const handleDeleteNode = (folderId) => {
    const finalStructure = deleteNode(comments, folderId);
    const temp = { ...finalStructure }
    setComments(temp);
  }

  // handles fetching and displaying comments
  const handleOpenCommandPanel = async () => {
   if (!openCommentPanel) { // adds & displays comments if the comment panel is opened
    try {
      const response = await fetch ('/api/post/comments/' + post._id, { 
          headers: { // include token in header
              'Content-Type': 'application/json',
              'Authorization': 'Bearer ' + user.token,
          },
          method: 'GET'
      })
      const allComments = await response.json()
      console.log(allComments)
      const mainNodeStructure = { // this is a "fake" main comment & is the root of all real comments
        _id: 1,
        comments: allComments,
        date: null,
        user_id: null
      }
      setComments(mainNodeStructure)
      setOpenCommentPanel(!openCommentPanel)

    } catch (error) {
      console.log(error)

    }} else if (openCommentPanel) { // if the comment panel is already open, then close it and "clear out comment cache"

      setOpenCommentPanel(!openCommentPanel)
      setComments(null)
    }

  }

  let avatarURL = "https://img.freepik.com/free-photo/fashion-boy-with-yellow-jacket-blue-pants_71767-96.jpg?w=1380&t=st=1700010094~exp=1700010694~hmac=b9d7f8d56b66ac184e10e6b6fc4df817beaf81b63a6e495f32ad81e1eebbbb1a"
  
  return (
    <>
      <div className="post-card">
        <div className="header">
          <div className="user-info">
            <img className="avatar" src={avatarURL} alt="User Avatar" />
            <div>
              <h3 className="name">{post.profile_name}</h3>
              <p className="date">{post.dateCreated}</p>
            </div>
          </div>
          <h4 className="project-name">{post.postName}</h4>
        </div>
        <div className="content">
          <p className="description">{post.description}</p>
        </div>
        <div className="actions">
          <button 
            className={`like-button ${color ? 'colored' : ''}`} 
            onClick={() => handleLike(post)}
          >
              Like
          </button>
          <span className="likes">{post.numberOfLikes} Likes</span>
          <button 
            className="comment-button"
            onClick={handleOpenCommandPanel}

          >
              Comment
          </button>
        </div>
      </div>
      <div>
        {openCommentPanel ? (
          <Comment 
            comment={comments} 
            handleInsertNode={handleInsertNode}
            handleEditNode={handleEditNode}
            handleDeleteNode={handleDeleteNode}
            userId={userId}
          />
        ):(
          <></>
        )}
      </div>
    </>
  );
};

export default PostCard;

