import React, { Component } from 'react';

const PostBox = ({ post }) => {
    return (
      <div className="post-box">
        <div className="post-header">
          <div className="post-user">
            {/* <img src={post.user.avatar} alt={post.user.name} /> */}
            <div className="post-user-info">
              <h3>{post.user.name}</h3>
              <p>{post.ageSinceUpload} ago</p>
            </div>
          </div>
        </div>
        <div className="post-content">
          <p>{post.textDescription}</p>
          {post.images && (
            <div className="post-images">
              {post.images.map((image) => (
                <img key={image.id} src={image.url} />
              ))}
            </div>
          )}
        </div>
      </div>
    );
  };
  
  export default PostBox;

