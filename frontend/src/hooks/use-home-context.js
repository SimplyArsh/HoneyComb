import { HomeContext } from '../context/home-context'
import { useContext } from "react"

export const useHomeContext = () => { // create a hook
    const context = useContext(HomeContext) // returns the value of this context

    if (!context) { // if this hook is used wrongly, throw an error
        throw Error('useHomeContext must be used inside an HomeProviderContext')
    }

    return context
}