import React from 'react';

const PostCard = ({
  post, 
  handleLike,
  color
}) => {
  let avatarURL = "https://img.freepik.com/free-photo/fashion-boy-with-yellow-jacket-blue-pants_71767-96.jpg?w=1380&t=st=1700010094~exp=1700010694~hmac=b9d7f8d56b66ac184e10e6b6fc4df817beaf81b63a6e495f32ad81e1eebbbb1a"

  return (
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
        <button className={`like-button ${color ? 'colored' : ''}`} onClick={() => handleLike(post)}>Like</button>
        <span className="likes">{post.numberOfLikes} Likes</span>
        <button className="comment-button">Comment</button>
      </div>
    </div>
  );
};

export default PostCard;

