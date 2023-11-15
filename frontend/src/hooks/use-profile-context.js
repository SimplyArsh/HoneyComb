import { ProfileContext } from '../context/profile-context'
import { useContext } from "react"

export const useProfileContext = () => { // create a hook
    const context = useContext(ProfileContext) // returns the value of this context

    if (!context) { // if this hook is used wrongly, throw an error
        throw Error('useProfileContext must be used inside an ProfileContextProvider')
    }

    return context
}