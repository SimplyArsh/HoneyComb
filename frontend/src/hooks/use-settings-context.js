import { SettingsContext } from '../context/settings-context'
import { useContext } from "react"

export const useSettingsContext = () => { // create a hook
    const context = useContext(SettingsContext) // returns the value of this context

    if (!context) { // if this hook is used wrongly, throw an error
        throw Error('useSettingsContext must be used inside a SettingsContextProvider')
    }

    return context
}