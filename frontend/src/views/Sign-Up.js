import { useState } from "react"

const SignUp = () => {
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [aboutMe, setAboutMe] = useState('')

    const handleSubmit = async (e) => {
        e.preventDefault() // Don't refresh the page by default
    }

    return (
        <div className="signUp">
            <h1>Sign up</h1>
            <form className="create" onSubmit={handleSubmit}>
                <label>Username:</label>
                <input
                    type="text"
                    onChange={(e) => {
                        setEmail(e.target.value)
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
                        setEmail(e.target.value)
                    }}
                />
            </form>
        </div>
    )
}

export default SignUp