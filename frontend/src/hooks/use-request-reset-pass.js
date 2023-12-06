import { useState } from "react"

export const useRequestReset = () => {
    const [error, setError] = useState(null)
    const [isLoading, setIsLoading] = useState(null)
    const [successMessage, setSuccessMessage] = useState(null)

    const request_reset = async (email) => {
        setIsLoading(true)
        setError(null)
        setSuccessMessage(null)

        try {
            const response = await fetch('/api/auth/requestResetPassword', {
                method: 'POST',
                body: JSON.stringify({email}),
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            const json = await response.json()  //Get back response

            if (!response.ok) {
                setError(json.error)
            } else {
                setSuccessMessage(json.message)
            }
        }
        catch (error) {
            setError("An error occurred while sending the request.")
        } 
        finally {
            setIsLoading(false)
        }
    }
    return { request_reset, isLoading, error, successMessage }
}