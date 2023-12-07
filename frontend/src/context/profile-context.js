import { createContext, useReducer } from 'react'

export const ProfileContext = createContext() // Allow other files to access this global context

export const profileReducer = (state, action) => { // action comes from dispatch
    switch (action.type) {
        case 'SET_CURRENT_POSTS': // set the current posts according to payload
            return { ...state, currentPosts: action.payload };
        case 'SET_COMPLETED_POSTS': // set the completed posts according to payload
            return { ...state, completedPosts: action.payload };
        case 'DELETE_POST':
            return {
                ...state,
                currentPosts: state.currentPosts.filter((post) => post._id !== action.payload._id), // remove the matching post
                completedPosts: state.completedPosts.filter((post) => post._id !== action.payload._id) // remove the matching post
            }
        case 'SET_EDIT_POST_ID': // set the edit id according to payload
            return { ...state, editPostId: action.payload };
        case 'SET_EDIT_FORM_DATA': // set the edit form data according to payload
            return { ...state, editFormData: action.payload };
        case 'SET_USERNAME': // set the username according to payload
            return { ...state, username: action.payload };
        case 'SET_EMAIL': // set the email according to payload
            return { ...state, email: action.payload };
        case 'SET_DATE_JOINED': // set the date joined according to payload
            return { ...state, dateJoined: action.payload };
        case 'SET_NUMBER_OF_LIKES': // set the number of likes according to payload
            return { ...state, numberOfLikes: action.payload };
        case 'SET_NUMBER_OF_POSTS': // set the number of posts using context data
            return { ...state, numberOfPosts: state.currentPosts.length + state.completedPosts.length };
        case 'SET_ABOUT_ME': // set the about me according to payload
            return { ...state, aboutMe: action.payload };
        case 'SET_AVATAR_NUMBER': // set the about me according to payload
            return { ...state, avatarNumber: action.payload };
        default:
            return state
    }
}

export const ProfileContextProvider = ({ children }) => { // the object wrapped by this context is called children. In our case, the profile page is the child
    const [state, dispatch] = useReducer(profileReducer, {
        currentPosts: [],
        completedPosts: [],
        editPostId: null,
        editFormData: ({
            postName: '',
            description: '',
            skills: '',
        }),
        username: null,
        email: null,
        dateJoined: null,
        numberOflikes: null,
        numberOfPosts: null,
        aboutMe: null,
        avatarNumber: null
    }) // similar to useState, but more powerful. To update the state object, first call the dispatch function. When you call the dispatch function, the reducer functon is invoked. 

    return ( // we want to wrap this around whatever needs profile context
        <ProfileContext.Provider value={{ ...state, dispatch }
        }>
            {children}
        </ProfileContext.Provider>
    )
}