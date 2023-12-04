import { useEffect } from 'react'
import { useParams } from 'react-router-dom';
import { useAuthContext } from '../hooks/use-auth-context'
import { useProfileContext } from '../hooks/use-profile-context';
import ProfilePostList from '../components/Profile-Post-List'
import ProfileUserInfo from '../components/Profile-User-Info'
import { useNavigate } from 'react-router-dom'

const Profile = () => {
    const { id } = useParams()
    const { user } = useAuthContext()
    const { dispatch } = useProfileContext()
    const navigate = useNavigate()

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
            else { // look at profile for specific user
                response = await fetch('/api/user/profile/' + id, {
                    headers: { // include token in header
                        'Authorization': 'Bearer ' + user.token
                    }
                })
            }

            const json = await response.json() // get user info from server and update context

            if (!response.ok) {
                navigate('/pageNotFound');
                return "Error"
            }

            // update profile context
            dispatch({ type: 'SET_USERNAME', payload: json.username })
            dispatch({ type: 'SET_EMAIL', payload: json.email })
            dispatch({ type: 'SET_DATE_JOINED', payload: json.createdAt })
            dispatch({ type: 'SET_NUMBER_OF_LIKES', payload: json.numberOfLikes })
            dispatch({ type: 'SET_NUMBER_OF_POSTS' })
            dispatch({ type: 'SET_ABOUT_ME', payload: json.aboutMe })
        }

        if (user) {
            fetchProfile()
        }

    }, [user, id, dispatch, navigate]) // hook

    return (
        <div className="profilePage">
            <ProfileUserInfo />
            <ProfilePostList completed={false} id={id} />
            <ProfilePostList completed={true} id={id} />
        </div>
    )
}

export default Profile