import { useState } from "react"
import { useUserContext } from "../hooks/use-user-context"
import { useNavigate } from 'react-router-dom'

const SignUp = () => {
    const { token, dispatch } = useUserContext()
    const navigate = useNavigate()

    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [aboutMe, setAboutMe] = useState('')
    const [error, setError] = useState(null) // signup error display message

    const handleSubmit = async (e) => {
        e.preventDefault() // Don't refresh the page by default
        const signUpInfo = { username, email, password, aboutMe }

        const response = await fetch('/api/user/signup', { // check if signup is valid
            method: 'POST',
            body: JSON.stringify(signUpInfo),
            headers: {
                'Content-Type': 'application/json'
            }
        })

        const json = await response.json() // get back response

        if (!response.ok) {
            setError(json.error)
        }

        if (response.ok) {
            dispatch({ type: 'SET_TOKEN', payload: json.token })
            navigate('/')
        }
    }

    return (
        <div className="signUp">
            <h1>Sign up</h1>
            <form className="create" onSubmit={handleSubmit}>
                <label>Username:</label>
                <input
                    type="text"
                    onChange={(e) => {
                        setUsername(e.target.value)
                    }}
                />
                <label>Email:</label>
                <input
                    type="text"
                    onChange={(e) => {
                        setEmail(e.target.value)
                    }}
                />
                <label>Password:</label>
                <input
                    type="text"
                    onChange={(e) => {
                        setPassword(e.target.value)
                    }}
                />
                <label>About me:</label>
                <input
                    type="text"
                    onChange={(e) => {
                        setAboutMe(e.target.value)
                    }}
                />
                <button>SignUp</button>
                {error && <div className="error">{error}</div>}
            </form>
        </div>
    )
}

export default SignUp