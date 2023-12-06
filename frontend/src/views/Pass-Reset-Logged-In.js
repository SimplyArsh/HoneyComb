import { useState, useEffect } from "react"
import { useReset } from "../hooks/use-reset-pass"
import { useAuthContext } from '../hooks/use-auth-context'
import { useNavigate } from "react-router-dom"

const ResetPasswordLoggedIn = () => {
    const [newPassword, setNewPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [currentPassword, setCurrentPassword] = useState('')
    const { reset, isLoading, error, confirmError, successMessage } = useReset()
    const { user } = useAuthContext()
    const navigate = useNavigate()

    useEffect(() => {
        if (!user) {
            navigate('/login')
        }
    }, [user, navigate]);   // Runs whenever user or navigate changes

    const handleSubmit = async (e) => {
        e.preventDefault() // Don't refresh the page by default
        const authToken = user.token
        if (user) {
            await reset(null, newPassword, confirmPassword, currentPassword, null, authToken)
        } else {
            return
        }
    }

    return (
        <div className="login">
            <h1>Reset Your Password</h1>
            <form className="create" onSubmit={handleSubmit}>
                <label>Enter Your Current Password:</label>
                <input
                    type="password"
                    onChange={(e) => {
                        setCurrentPassword(e.target.value)
                    }} placeholder='Enter current password'
                />
                <label>Choose a New Password:</label>
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

export default ResetPasswordLoggedIn