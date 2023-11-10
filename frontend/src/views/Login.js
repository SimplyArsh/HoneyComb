import { useState } from "react"
import { useUserContext } from "../hooks/use-user-context"
import { useNavigate } from 'react-router-dom'

const Login = () => {
    const { token, dispatch } = useUserContext()
    const navigate = useNavigate()

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState(null) // login error display message

    const handleSubmit = async (e) => {
        e.preventDefault() // Don't refresh the page by default

        const loginInfo = { email, password }

        const response = await fetch('/api/user/login', { // check if login is valid
            method: 'POST',
            body: JSON.stringify(loginInfo),
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
                <button>Login</button>
                {error && <div className="error">{error}</div>}
            </form>
        </div>
    )
}

export default Login