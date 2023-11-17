import { useEffect } from 'react'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useParams } from 'react-router-dom';
import { useAuthContext } from '../hooks/use-auth-context'

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

const PostList = ({ posts }) => {
    return (
        <div>
            <h1>Posts:</h1>
            <ul>
                {posts.map((post, index) => (
                    <li key={index}>{post}</li>
                ))}
            </ul>
        </div>

    )
}

const Profile = () => {
    const { id } = useParams()
    const { user } = useAuthContext()

    const [username, setUsername] = useState(null)
    const [email, setEmail] = useState(null)
    const [dateJoined, setDateJoined] = useState(null)
    const [numberOfLikes, setNumberOfLikes] = useState(null)
    const [numberOfPosts, setNumberOfPosts] = useState(null)
    const [aboutMe, setAboutMe] = useState(null)
    const [postList, setPostList] = useState([])

    useEffect(() => {
        if (!user) {
            console.log("You must be logged in")
            return
        }

        const fetchProfile = async () => {
            let response
            if (id == null) { // fetch user own data if no id after profile. Otherwise look for specific id
                response = await fetch('/api/user/profile', {
                    headers: { // include token in header
                        'Authorization': 'Bearer ' + user.token
                    }
                })
            }
            else {
                response = await fetch('/api/user/profile/' + id, {
                    headers: { // include token in header
                        'Authorization': 'Bearer ' + user.token
                    }
                })
            }

            const json = await response.json() // get user info from server and update state

            if (!response.ok) {
                return "Error"
            }
            setUsername(json.username)
            setEmail(json.email)
            setDateJoined(json.createdAt)
            setNumberOfLikes(json.numberOfLikes)
            setNumberOfPosts(json.numberOfPosts)
            setAboutMe(json.aboutMe)
            setPostList(json.postList)
        }

        if (user) {
            fetchProfile()
        }

    }, [user, id]) // hook

    return (
        <div className="profilePage">
            <ProfileUserInfo personInfo={{ username, email, dateJoined, numberOfLikes, numberOfPosts, aboutMe }} />
            <PostList title="Current Posts" posts={postList} />
        </div>
    )
}

export default Profile