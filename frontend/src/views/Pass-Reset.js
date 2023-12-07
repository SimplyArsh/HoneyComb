import { useState } from "react"
import { useReset } from "../hooks/use-reset-pass"
import { useLocation } from 'react-router-dom'
import '../css-components/sign-up.css'

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
            <div className="spacer"></div>
            <h1>Reset Your Password</h1>
            <div className="spacer"></div>
            <div className="container mt-6">
                <div className="card">
                    <form className="create" onSubmit={handleSubmit}>
                        <div className="spacer"></div>
                        <label>Password:</label>
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

export default ResetPassword