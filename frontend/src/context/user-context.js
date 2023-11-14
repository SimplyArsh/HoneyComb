import { createContext, useReducer } from 'react'

export const UserContext = createContext() // Allow other files to access this global context

export const userReducer = (state, action) => { // action comes from dispatch
    switch (action.type) {
        case 'SET_USER':
            return {
                nothingForNow: action.payload
            }
        default:
            return state
    }
}

export const UserContextProvider = ({ children }) => { // the object wrapped by this context is called children. In our case, the entire app is the child
    const [state, dispatch] = useReducer(userReducer, {
        nothingForNow: null
    }) // similar to useState, but more powerful. To update the state object, first call the dispatch function. When you call the dispatch function, the reducer functon is invoked. 

    return ( // we want to wrap this around whatever needs user context
        <UserContext.Provider value={{ ...state, dispatch }
        }>
            {children}
        </UserContext.Provider>
    )
}