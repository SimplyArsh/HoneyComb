import { Link } from 'react-router-dom'
import { useProfileContext } from '../hooks/use-profile-context';

const ProfileUserInfo = () => { // display the info of the profile user

    const { username, email, dateJoined, numberOfLikes, numberOfPosts, aboutMe } = useProfileContext()
    let avatarURL = "https://img.freepik.com/free-photo/fashion-boy-with-yellow-jacket-blue-pants_71767-96.jpg?w=1380&t=st=1700010094~exp=1700010694~hmac=b9d7f8d56b66ac184e10e6b6fc4df817beaf81b63a6e495f32ad81e1eebbbb1a"
    
    return (
        <div className="header" >
            <div className="container mt-6">
            <div className="col-md-6 mx-auto"> 
                <div className="card profileDetails" style={{ display: 'flex', flexDirection: 'column', position: 'relative', alignItems: 'center' }}>
                <div className="small-spacer"></div>
                    <div className="profileImage">
                        <img className="avatar" src={avatarURL} alt="User Avatar"/>
                    </div>
                    <div className="profileInfo">
                        <h1>{username}</h1>
                        <h5><strong>{email}</strong></h5>
                        <div className="small-spacer"></div>
                        <p><strong>Date Joined:</strong> {dateJoined}</p>
                        <p><strong>Likes:</strong> {numberOfLikes}</p>
                        <p><strong>Posts:</strong> {numberOfPosts}</p>
                        <p><strong>About me:</strong> {aboutMe}</p>
                    </div>
                </div>
            </div>
            </div>
            <div className="actions">
                <Link to="/createProject"><i className="fa fa-plus"></i></Link>
                <Link to="/messages"><i className="fa fa-envelope"></i></Link>
            </div>
        </div >
    )
};

export default ProfileUserInfo