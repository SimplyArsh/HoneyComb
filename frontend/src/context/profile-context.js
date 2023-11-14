import { createContext, useReducer } from 'react'

export const ProfileContext = createContext() // Allow other files to access this global context

export const profileReducer = (state, action) => { // action comes from dispatch
    switch (action.type) {
        case 'SET_CURRENT_POSTS':
            return { ...state, currentPosts: action.payload };
        case 'SET_COMPLETED_POSTS':
            return { ...state, completedPosts: action.payload };
        case 'DELETE_POST':
            return {
                currentPosts: state.currentPosts.filter((post) => post._id !== action.payload._id), // remove the matching post
                completedPosts: state.completedPosts.filter((post) => post._id !== action.payload._id) // remove the matching post
            }
        default:
            return state
    }
}

export const ProfileContextProvider = ({ children }) => { // the object wrapped by this context is called children. In our case, the profile page is the child
    const [state, dispatch] = useReducer(profileReducer, {
        currentPosts: [],
        completedPosts: []
    }) // similar to useState, but more powerful. To update the state object, first call the dispatch function. When you call the dispatch function, the reducer functon is invoked. 

    return ( // we want to wrap this around whatever needs profile context
        <ProfileContext.Provider value={{ ...state, dispatch }
        }>
            {children}
        </ProfileContext.Provider>
    )
}