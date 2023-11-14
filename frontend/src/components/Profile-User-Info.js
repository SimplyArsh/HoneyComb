import { Link } from 'react-router-dom'

const ProfileUserInfo = ({ personInfo }) => (
    <div className="header" >
        <div className="icon">
            <i className="fa fa-user"></i> {/* Font Awesome icons */}
        </div>
        <div className="profileInfo">
            <h1>{personInfo.username}</h1>
            <h1>{personInfo.email}</h1>
            <p>Date Joined: {personInfo.dateJoined}</p>
            <p>Likes: {personInfo.numberOfLikes}</p>
            <p>Posts: {personInfo.numberOfPosts}</p>
            <p>About me: {personInfo.aboutMe}</p>
        </div>
        <div className="actions">
            <Link to="/createProject"><i className="fa fa-plus"></i></Link>
            <Link to="/messages"><i className="fa fa-envelope"></i></Link>
        </div>
    </div >
);

export default ProfileUserInfo