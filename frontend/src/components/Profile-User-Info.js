import { Link } from 'react-router-dom'
import { useProfileContext } from '../hooks/use-profile-context';

function ChooseImage({avatarNumber}) {
    console.log(avatarNumber)
    switch(avatarNumber) {
        
        case 0:
            return (<img className="avatar" style={{ width: 150, height: 150 }} src={require('../assets/i1.jpeg')} />)
        case 1:
            return (<img className="avatar" style={{ width: 150, height: 150 }} src={require('../assets/i2.jpeg')} />)
        case 2:
            return (<img className="avatar" style={{ width: 150, height: 150 }} src={require('../assets/i3.jpeg')} />)
        case 3:
            return (<img className="avatar" style={{ width: 150, height: 150 }} src={require('../assets/i4.jpeg')} />)
        case 4:
            return (<img className="avatar" style={{ width: 150, height: 150 }} src={require('../assets/i5.jpeg')} />)
        case 5:
            return (<img className="avatar" style={{ width: 150, height: 150 }} src={require('../assets/i6.jpeg')} />)
    }    
}

const ProfileUserInfo = () => { // display the info of the profile user

    const { username, email, dateJoined, numberOfLikes, numberOfPosts, aboutMe, avatarNumber } = useProfileContext()
    
    
    return (
        <div className="header" >
            <div className="container mt-6">
            <div className="col-md-6 mx-auto"> 
                <div className="card profileDetails" style={{ display: 'flex', flexDirection: 'column', position: 'relative', alignItems: 'center' }}>
                <div className="small-spacer"></div>
                    <div className="profileImage">
                        <ChooseImage avatarNumber={avatarNumber}></ChooseImage>
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