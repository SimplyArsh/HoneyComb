import { useState } from "react"
import { useReset } from "../hooks/use-reset-pass"
import { useLocation } from 'react-router-dom'

const ResetPassword = () => {
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const { reset, isLoading, error, confirmError } = useReset()
    const location = useLocation()

    const handleSubmit = async (e) => {
        e.preventDefault() // Don't refresh the page by default

        const params = new URLSearchParams(location.search)
        const userID = params.get('id')
        const token = params.get('token')

        await reset(userID, token, password, confirmPassword)
    }

    return (
        <div className="login">
            <h1>Reset Your Password</h1>
            <form className="create" onSubmit={handleSubmit}>
                <label>Password:</label>
                <input
                    type="password"
                    onChange={(e) => {
                        setPassword(e.target.value)
                    }} placeholder='Enter new password'
                />
                <input
                    type="password"
                    onChange={(e) => {
                        setConfirmPassword(e.target.value)
                    }} placeholder='Confirm new password'
                />
                <button type='submit' disabled={isLoading}>Reset Password</button>
                {error && <div className="error">{error}</div>}
                {confirmError && <div className='error'>{confirmError}</div>}
            </form>
        </div>
    )
}

export default ResetPassword