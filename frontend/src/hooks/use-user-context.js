import { UserContext } from '../context/user-context'
import { useContext } from "react"

export const useUserContext = () => { // create a hook
    const context = useContext(UserContext) // returns the value of this context

    if (!context) { // if this hook is used wrongly, throw an error
        throw Error('useUserContext must be used inside a UserContextProvider')
    }

    return context
}