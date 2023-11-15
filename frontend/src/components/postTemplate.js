import React from 'react';

const PostCard = ({
  name,
  avatar,
  description,
  dateCreated,
  likes,
  projectName, // Assuming "projectName" is one of the new criteria
  // Add other new criteria as needed
}) => {
  return (
    <div className="post-card">
      <div className="header">
        <div className="user-info">
          <img className="avatar" src={avatar} alt="User Avatar" />
          <div>
            <h3 className="name">{name}</h3>
            <p className="date">{dateCreated}</p>
          </div>
        </div>
        <h4 className="project-name">{projectName}</h4>
      </div>
      <div className="content">
        <p className="description">{description}</p>
      </div>
      <div className="actions">
        <button className="like-button">Like</button>
        <span className="likes">{likes} Likes</span>
        <button className="comment-button">Comment</button>
      </div>
    </div>
  );
};

export default PostCard;

