import { Link } from 'react-router-dom'
import { useState } from "react"
import { useLogin } from "../hooks/use-login"

const Login = () => {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const { login, error, isLoading } = useLogin()

    const handleSubmit = async (e) => {
        e.preventDefault() // Don't refresh the page by default

        await login(email, password)
    }

    return (
        <div className="login">
            <div className="spacer"></div>
            <h2>Login</h2>
            <div className="spacer"></div>
            <form className="create" onSubmit={handleSubmit}>
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
                <button className="btn submit-button" disabled={isLoading}>Login</button>

                {error && <div className="error">{error}</div>}


                <div>Don't have an account yet?</div>
                <Link to='/signup'>
                    <p>Sign Up</p>
                </Link>

                <div>Forgot your Password?</div>
                <Link to='/requestResetPass'>
                    <p>Reset Password</p>
                </Link>
            </form>
        </div>
    )
}

export default Login