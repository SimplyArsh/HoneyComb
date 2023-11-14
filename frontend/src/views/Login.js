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
            <h1>Login</h1>
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
                    type="text"
                    onChange={(e) => {
                        setPassword(e.target.value)
                    }}
                />
                <button disabled={isLoading}>Login</button>
                {error && <div className="error">{error}</div>}
                
                <div>Don't have an account yet?</div>
                <button>Sign Up</button>
            </form>
        </div>
    )
}

export default Login