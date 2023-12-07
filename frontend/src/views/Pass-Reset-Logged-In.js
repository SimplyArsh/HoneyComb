import { useState, useEffect } from "react"
import { useReset } from "../hooks/use-reset-pass"
import { useAuthContext } from '../hooks/use-auth-context'
import { useNavigate } from "react-router-dom"
import '../css-components/sign-up.css'

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
            <div className="spacer"></div>
            <h1>Change Your Password</h1>
            <div className="spacer"></div>
            <div className="container mt-6">
                <div className="card">
                    <form className="create" onSubmit={handleSubmit}>
                    <div className="spacer"></div>
                        <label>Enter Your Current Password:</label>
                        <input
                            type="password"
                            onChange={(e) => {
                                setCurrentPassword(e.target.value)
                            }} placeholder='Enter current password'
                        />
                        <label>Choose a New Password:</label>
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
                    <div className="spacer"></div>
                </div>
            </div>
            <div className="very-long-spacer"></div>
        </div>
    )
}

export default ResetPasswordLoggedIn