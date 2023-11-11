import { AuthContext } from '../context/auth-context'
import { useContext } from "react"

export const useAuthContext = () => { // create a hook
    const context = useContext(AuthContext) // returns the value of this context

    if (!context) { // if this hook is used wrongly, throw an error
        throw Error('useAuthContext must be used inside an AuthContextProvider')
    }

    return context
}