import { useState } from "react"

export const useReset = () => {
    const [error, setError] = useState(null)
    const [confirmError, setConfirmError] = useState(null)
    const [isLoading, setIsLoading] = useState(null)

    const reset = async (userID, token, password, confirmPassword) => {
        setIsLoading(true)
        setError(null)
        setConfirmError(null);

        if (password !== confirmPassword) {
            setConfirmError('Passwords do not match.');
            setIsLoading(false);
            return;
        }

        const response = await fetch('/api/auth/resetPassword', { // check if login is valid
            method: 'POST',
            body: JSON.stringify({ userID, token, password }),
            headers: {
                'Content-Type': 'application/json'
            }
        })

        const json = await response.json() // get back response

        if (!response.ok) {
            setIsLoading(false)
            setError(json.error)
        }

        if (response.ok) {
            setIsLoading(false)
        }
    }
    return { reset, isLoading, error, confirmError }
}