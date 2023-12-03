import { useState } from "react"

export const useRequestReset = () => {
    const [error, setError] = useState(null)
    const [isLoading, setIsLoading] = useState(null)

    const request_reset = async (email) => {
        setIsLoading(true)
        setError(null)

        const response = await fetch('/api/auth/requestResetPassword', { // check if login is valid
            method: 'POST',
            body: JSON.stringify({email}),
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
    return { request_reset, isLoading, error }
}