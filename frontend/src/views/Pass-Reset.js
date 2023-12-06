import { useState } from "react"
import { useReset } from "../hooks/use-reset-pass"
import { useLocation } from 'react-router-dom'

const ResetPassword = () => {
    const [newPassword, setNewPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const { reset, isLoading, error, confirmError, successMessage } = useReset()
    const location = useLocation()

    const handleSubmit = async (e) => {
        e.preventDefault() // Don't refresh the page by default

        const params = new URLSearchParams(location.search)
        const userID = params.get('id')
        const token = params.get('token')

        await reset(userID, newPassword, confirmPassword, null, token, null)
    }

    return (
        <div className="login">
            <h1>Reset Your Password</h1>
            <form className="create" onSubmit={handleSubmit}>
                <label>Password:</label>
                <input
                    type="password"
                    onChange={(e) => {
                        setNewPassword(e.target.value)
                    }} placeholder='Enter new password'
                />
                <input
                    type="password"
                    onChange={(e) => {
                        setConfirmPassword(e.target.value)
                    }} placeholder='Confirm new password'
                />
                <button className="btn submit-button" type='submit' disabled={isLoading}>Reset Password</button>
                {successMessage && <div className="success">{successMessage}</div>}
                {error && <div className="error">{error}</div>}
                {confirmError && <div className='error'>{confirmError}</div>}
            </form>
        </div>
    )
}

export default ResetPassword