import React, { useState, useEffect } from 'react';
import Comment from "../components/Comments"
import useNode from "../hooks/comment-node.js"

const PostCard = ({
  post, 
  handleLike,
  color,
  handleInsertNode,
  handleEditNode,
  handleDeleteNode,
  userId
}) => {

  const [comments, setComments] = useState() // sets all comments for a post
  const [openCommentPanel, setOpenCommentPanel] = useState(false)

  const mainNodeStructure = { // this is a "fake" main comment & is the root of all real comments

  }

  // handles fetching and displaying comments
  // const handleOpenCommandPanel = async () => {

  //  if (!openCommentPanel) { // adds & displays comments if the comment panel is opened
  //   try {
  //     const response = await fetch ('/api/post/comments/' + post._id, { 
  //         headers: { // include token in header
  //             'Content-Type': 'application/json',
  //             'Authorization': 'Bearer ' + user.token,
  //         },
  //         method: 'GET'
  //     })
  //     const allComments = await response.json()
  //     setComments(allComments)
  //     console.log(res)

  //     if (comments) {
  //       setOpenCommentPanel(!openCommentPanel)
  //     }

  //   } catch (error) {
  //     console.log(error)

  //   }} else if (openCommentPanel) { // if the comment panel is already open, then close it and "clear out comment cache"

  //     setOpenCommentPanel(!openCommentPanel)
  //     setComments(null)
  //   }

  // }

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
            onClick={() => {setOpenCommentPanel(!openCommentPanel)}}
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
            editable={true}
          />
        ):(
          <></>
        )}
      </div>
    </>
  );
};

export default PostCard;

