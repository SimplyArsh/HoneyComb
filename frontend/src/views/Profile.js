import { useState } from "react"
import { Link } from 'react-router-dom'

const ProfileUserInfo = ({ username, dateJoined, likes, posts, aboutMe }) => (
    <div className="header">
        <div className="icon">
            <i className="fa fa-user"></i> {/* Font Awesome icons */}
        </div>
        <div className="profileInfo">
            <h1>{username}</h1>
            <p>Date Joined: {dateJoined}</p>
            <p>Likes: {likes}</p>
            <p>Posts: {posts}</p>
            <p>About me: {aboutMe}</p>
        </div>
        <div className="actions">
            <Link to="/createProject"><i className="fa fa-plus"></i></Link>
            <Link to="/messages"><i className="fa fa-envelope"></i></Link>
        </div>
    </div>
);

const PostList = ({ posts, title }) => (
    <div className="postList">
        <h2>{title}</h2>
        {/* {posts.map((post, index) => (
            <div key={index} className="post">
                <h3>{post.title}</h3>
                <p>{post.content}</p>
            </div>
        ))} */}
    </div>
);

const Profile = () => {
    return (
        <div className="profilePage">
            <ProfileUserInfo />
            <PostList title="Current Posts" />
            <PostList title="Past Posts" />
        </div>
    )
}

export default Profile