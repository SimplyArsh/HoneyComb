import { Link } from 'react-router-dom'
import { useProfileContext } from '../hooks/use-profile-context';

const ProfileUserInfo = () => { // display the info of the profile user

    const { username, email, dateJoined, numberOfLikes, numberOfPosts, aboutMe } = useProfileContext()

    return (
        <div className="header" >
            <div className="icon">
                <i className="fa fa-user"></i> {/* Font Awesome icons */}
            </div>
            <div className="profileInfo">
                <h1>{username}</h1>
                <h1>{email}</h1>
                <p>Date Joined: {dateJoined}</p>
                <p>Likes: {numberOfLikes}</p>
                <p>Posts: {numberOfPosts}</p>
                <p>About me: {aboutMe}</p>
            </div>
            <div className="actions">
                <Link to="/createProject"><i className="fa fa-plus"></i></Link>
                <Link to="/messages"><i className="fa fa-envelope"></i></Link>
            </div>
        </div >
    )
};

export default ProfileUserInfo