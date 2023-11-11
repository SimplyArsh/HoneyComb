import { createContext, useReducer, useEffect } from 'react'

export const AuthContext = createContext() // Allow other files to access this global context

export const authReducer = (state, action) => { // action comes from dispatch
    switch (action.type) {
        case 'LOGIN':
            return { user: action.payload }
        case 'LOGOUT':
            return { user: null }
        default:
            return state
    }
}

export const AuthContextProvider = ({ children }) => { // the object wrapped by this context is called children. In our case, the entire app is the child
    const [state, dispatch] = useReducer(authReducer, {
        user: null
    }) // similar to useState, but more powerful. To update the state object, first call the dispatch function. When you call the dispatch function, the reducer functon is invoked. 

    useEffect(() => { // when component renders, check if token exists in local storage
        const user = JSON.parse(localStorage.getItem('user'))

        if (user) {
            dispatch({ type: 'LOGIN', payload: user })
        }
    }, []) // [] means run useEffect once when the website refreshes

    console.log('AuthContext state: ', state)
    return ( // we want to wrap this around whatever needs user context
        <AuthContext.Provider value={{ ...state, dispatch }
        }>
            {children}
        </AuthContext.Provider>
    )
}