import { useEffect } from 'react'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useParams } from 'react-router-dom';

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

const PostList = ({ posts }) => (
    <div className="postList">
        <h2>{posts}</h2>
    </div>
);

const Profile = () => {
    const { id } = useParams()

    const [username, setUsername] = useState(null)
    const [email, setEmail] = useState(null)
    const [dateJoined, setDateJoined] = useState(null)
    const [numberOfLikes, setNumberOfLikes] = useState(null)
    const [numberOfPosts, setNumberOfPosts] = useState(null)
    const [aboutMe, setAboutMe] = useState(null)
    const [postList, setPostList] = useState(null)

    useEffect(() => {
        const fetchProfile = async () => {
            if (id == null) { // If no id, then user isn't looking at someone else's profile. Change this later to say if id == null and user not logged in, then don't fetch data. If user is logged in, fetch user's own profile
                return
            }
            const response = await fetch('/api/user/profile/' + id)

            const json = await response.json() // get user info from server and update state
            setUsername(json.username)
            setEmail(json.email)
            setDateJoined(json.createdAt)
            setNumberOfLikes(json.numberOfLikes)
            setNumberOfPosts(json.numberOfPosts)
            setAboutMe(json.aboutMe)
            setPostList(json.postList)

            if (!response.ok) {
                return "Error"
            }
        }

        fetchProfile()
    }) // hook

    if (id == null) { // change this later to say if id == null and user not logged in, then don't display profile 
        return (
            <div className="profilePage">
                <h1>No profile! Login or look at someone else's profile!</h1>
            </div>
        )
    }
    return (
        <div className="profilePage">
            <ProfileUserInfo personInfo={{ username, email, dateJoined, numberOfLikes, numberOfPosts, aboutMe }} />
            <PostList title="Current Posts" posts={postList} />
            <PostList title="Past Posts" posts={postList} />
        </div>
    )
}

export default Profile