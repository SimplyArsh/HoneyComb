import { createContext, useReducer } from 'react'

export const SettingsContext = createContext() // Allow other files to access this global context

export const settingsReducer = (state, action) => { // action comes from dispatch
    switch (action.type) {
        case 'SET_VISIBLE':
            return { ...state, visible: true };
        case 'SET_INVISIBLE':
            return { ...state, visible: false };
        case 'SET_LANGUAGE':
            console.log('LANGUAGE CHANGED TO ', action.payload)
            return { ...state, settings: { ...state.settings, language: action.payload } };
        case 'CHANGE_THEME': // swap themes
            if (state.settings.theme === 'light') {
                return { ...state, settings: { ...state.settings, theme: 'dark' } }
            }
            return { ...state, settings: { ...state.settings, theme: 'light' } }
        default:
            return state
    }
}

export const SettingsContextProvider = ({ children }) => { // the object wrapped by this context is called children. In our case, the entire app is the child
    const [state, dispatch] = useReducer(settingsReducer, {
        visible: false,
        settings: ({ theme: 'light', language: 'English' })
    }) // similar to useState, but more powerful. To update the state object, first call the dispatch function. When you call the dispatch function, the reducer functon is invoked. 

    return ( // we want to wrap this around whatever needs settings context
        <SettingsContext.Provider value={{ ...state, dispatch }
        }>
            {children}
        </SettingsContext.Provider>
    )
}