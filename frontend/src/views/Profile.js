import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { useAuthContext } from '../hooks/use-auth-context'
import ProfilePostList from '../components/Profile-Post-List'
import ProfileUserInfo from '../components/Profile-User-Info'

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
            <ProfilePostList postList={postList} completed={false} />
            <ProfilePostList postList={postList} completed={true} />
        </div>
    )
}

export default Profile