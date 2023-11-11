import { useState } from "react"
import { useAuthContext } from "../hooks/use-auth-context"

export const useSignup = () => {
    const [error, setError] = useState(null)
    const [isLoading, setIsLoading] = useState(null)
    const { dispatch } = useAuthContext()

    const signup = async (username, email, password, aboutMe) => {
        setIsLoading(true)
        setError(null)

        const response = await fetch('/api/user/signup', { // check if login is valid
            method: 'POST',
            body: JSON.stringify({ username, email, password, aboutMe }),
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
            // save the user to local storage
            localStorage.setItem('user', JSON.stringify(json))

            // update the auth context
            dispatch({ type: 'LOGIN', payload: json })

            setIsLoading(false)
        }
    }
    return { signup, isLoading, error }
}