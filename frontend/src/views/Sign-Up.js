import { useState } from "react"
import { useSignup } from '../hooks/use-signup'
import '../css-components/sign-up.css'

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
            <div className="spacer"></div>
            <h1>Sign Up</h1>
            <div className="spacer"></div>
            <div className="container mt-6">
                <div className="card">
                    <form className="create" onSubmit={handleSubmit}>
                        <div className="spacer"></div>
                        <label>Username:</label>
                        <input
                            type="text" className="text-box-area"
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
                        <div className="pass-req-box">
                            <div className="pass-requirements" >
                                <p>Must contain at least:</p>
                                <p>8 characters</p>
                                <p>1 upper-case character</p>
                                <p>1 lower-case character</p>
                                <p>1 number</p>
                                <p>1 symbol</p>
                            </div>
                        </div>
                        <input
                            type="password"
                            onChange={(e) => {
                                setPassword(e.target.value)
                            }}
                        />
                        <label>About me:</label>
                        <textarea className="form-control about-me"
                            type="text"
                            rows="4"
                            onChange={(e) => {
                                setAboutMe(e.target.value)
                            }}
                        />
                        <button className="btn submit-button" disabled={isLoading}>Sign up</button>
                        {error && <div className="error">{error}</div>}
                    </form>
                <div className="spacer"></div>
                </div>
                <div className="very-long-spacer"></div>
            </div>
        </div>
    )
}

export default SignUp