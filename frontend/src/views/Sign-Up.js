import { useState } from "react"
import { useSignup } from '../hooks/use-signup'

const SignUp = () => {
    // const { token, dispatch } = useUserContext()
    // const navigate = useNavigate()

    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [aboutMe, setAboutMe] = useState('')
    const { signup, error, isLoading } = useSignup()

    const handleSubmit = async (e) => {
        e.preventDefault() // Don't refresh the page by default

        await signup(username, email, password, aboutMe)
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
                    type="password"
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
                <button className="btn submit-button" disabled={isLoading}>Sign up</button>
                {error && <div className="error">{error}</div>}
            </form>
            <div className="very-long-spacer"></div>

        </div>
    )
}

export default SignUp