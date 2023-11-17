import { useState } from "react"
import { useRequestReset } from "../hooks/use-request-reset-pass"

const RequestResetPassword = () => {

    const [email, setEmail] = useState('')
    const { request_reset, isLoading, error } = useRequestReset()

    const handleSubmit = async (e) => {
        e.preventDefault() // Don't refresh the page by default

        await request_reset(email)
    }

    return (
        <div className="login">
            <h1>Request Password Reset</h1>
            <form className="create" onSubmit={handleSubmit}>
                <label>Email:</label>
                <input
                    type="text"
                    onChange={(e) => {
                        setEmail(e.target.value)
                    }}
                />
                <button disabled={isLoading}>Send Request</button>
                {error && <div className="error">{error}</div>}
            </form>
        </div>
    )
}

export default RequestResetPassword