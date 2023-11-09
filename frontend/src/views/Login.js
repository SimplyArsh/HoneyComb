import { useState } from "react"

const Login = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const handleSubmit = async (e) => {
        e.preventDefault() // Don't refresh the page by default
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
            </form>
        </div>
    )
}

export default Login