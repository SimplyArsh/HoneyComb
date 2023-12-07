import formatDistanceToNow from 'date-fns/formatDistanceToNow'
import React, { useState } from 'react';
import Comment from "../components/Comments"
import useNode from "../hooks/comment-node.js"
import { useAuthContext } from '../hooks/use-auth-context'
import { useNavigate, useLocation } from 'react-router-dom'

// format for post displays
const PostDetails = ({ editable, post, inProfilePage, handlePostComplete, handleEdit, handleDelete, handleLike,
    color,
    userId }) => { // if editable, add edit and delete buttons. Otherwise, don't add them
    const { insertNode, editNode, deleteNode } = useNode();
    const [comments, setComments] = useState(null) // sets all comments for a post
    const [openCommentPanel, setOpenCommentPanel] = useState(false)
    const { user } = useAuthContext()
    const navigate = useNavigate()
    const location = useLocation()
    
    const handleAvatar = async () => {
        navigate('/profile/:id', {state:{id: post.user_id}})
        console.log(post.user_id)
    }

    const handleInsertNode = async (commentId, item) => {
        var parentSelector = 0
        if (commentId === 1) {
            parentSelector = 1
            commentId = post._id
        }
        // console.log(comments)
        const copyOfComments = { ...comments }
        const finalStructure = await insertNode(copyOfComments, parentSelector, commentId, item);
        // console.log(finalStructure)
        setComments(finalStructure)
    }

    const handleEditNode = async (commentId, value) => {
        const finalStructure = await editNode(comments, commentId, value);
        setComments(finalStructure);
        console.log(finalStructure)
    }

    const handleDeleteNode = async (commentId) => {
        var postParentId = post._id
        const finalStructure = await deleteNode(comments, commentId, postParentId);
        const temp = { ...finalStructure }
        setComments(temp);
    }

    // handles fetching and displaying comments
    const handleOpenCommandPanel = async () => {
        if (!openCommentPanel) { // adds & displays comments if the comment panel is opened
            try {
                const response = await fetch('/api/post/comments/' + post._id, {
                    headers: { // include token in header
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + user.token,
                    },
                    method: 'GET'
                })
                const allComments = await response.json()
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

            }
        } else if (openCommentPanel) { // if the comment panel is already open, then close it and "clear out comment cache"

            setOpenCommentPanel(!openCommentPanel)
            setComments(null)
        }

    }
    
    let avatarURL = "https://img.freepik.com/free-photo/fashion-boy-with-yellow-jacket-blue-pants_71767-96.jpg?w=1380&t=st=1700010094~exp=1700010694~hmac=b9d7f8d56b66ac184e10e6b6fc4df817beaf81b63a6e495f32ad81e1eebbbb1a"


    return (
        <div className="container mt-6">
          <div className="card postDetails" style={{ display: 'flex', flexDirection: 'column', position: 'relative' }}>
            <p style={{ position: 'absolute', top: 0, right: 0, margin: '10px', fontSize: '14px', color: '#888' }}>
              {formatDistanceToNow(new Date(post.createdAt), { addSuffix: true })}
            </p>
      
            {!inProfilePage && (
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <button
                  className="btn circular-button"
                  onClick={() => handleAvatar(post)}
                >
                  <img className="avatar" src={avatarURL} alt="User Avatar" />
                </button>
                <h3 className="name" style={{ paddingLeft: '10px' }}>{post.profile_name}</h3>
              </div>
            )}
            <h2 className="postName">{post.postName}</h2>
            <p><strong>Description:</strong> {post.description}</p>
            <p><strong>Skills: </strong>{post.skills}</p>
            {/*<p><strong>Number of likes: </strong>{post.numberOfLikes}</p>*/}
            {editable && (
              <div className="icon-container">
                <span className="material-symbols-outlined" onClick={() => { handlePostComplete(post) }}>swap_vert</span>
                <span className="material-symbols-outlined" onClick={() => { handleEdit(post) }}>edit</span>
                <span className="material-symbols-outlined" onClick={() => { handleDelete(post._id) }}>delete</span>
              </div>
            )}
      
            {!inProfilePage && (
              <div>
                <div className="actions">
                  <button
                    className={`btn btn-secondary like-button ${color ? 'colored' : ''}`}
                    onClick={() => handleLike(post)}
                  >
                    Like
                  </button>
                  <span className="likes">{post.numberOfLikes} Likes</span>
                  <button
                    className="btn btn-secondary comment-button"
                    onClick={handleOpenCommandPanel}
                  >
                    Comment
                  </button>
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
                  ) : (
                    <></>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      );
      
}

export default PostDetails