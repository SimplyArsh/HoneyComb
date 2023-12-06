import { useState } from "react"
import { useNavigate } from 'react-router-dom';

export const useReset = () => {
    const navigate = useNavigate();
    const [error, setError] = useState(null)
    const [confirmError, setConfirmError] = useState(null)
    const [isLoading, setIsLoading] = useState(false)
    const [successMessage, setSuccessMessage] = useState(null)

    const reset = async (userID, newPassword, confirmPassword, currentPassword, token, userToken) => {
        setIsLoading(true)
        setError(null)
        setConfirmError(null);
        setSuccessMessage(null)

        if (newPassword !== confirmPassword) {
            setConfirmError('Passwords do not match.')
            setIsLoading(false)
            return
        }
        let headers = { 'Content-Type': 'application/json' }
        if (!userID) {
            headers = {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + userToken
            }
        }

        try {   
            const response = await fetch('/api/auth/resetPassword', { 
                method: 'POST',
                body: JSON.stringify({ userID, newPassword, currentPassword, token }),
                headers: headers
            })
            const json = await response.json() // get back response
    
            if (!response.ok) {
                setError(json.error)
            } else {
                setSuccessMessage(json.message)
                setTimeout(() => {
                    navigate('/login')
                }, 5000)
            }
        }
        catch (err) {
            setError("An error occurred while processing the request.")
        }
        finally {
            setIsLoading(false)
        }
    }
    return { reset, isLoading, error, confirmError, successMessage }
}