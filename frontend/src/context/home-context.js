import { createContext, useReducer } from 'react'

export const HomeContext = createContext() // Allow other files to access this global context

export const homeReducer = (state, action) => { // action comes from dispatch
    switch (action.type) {
        case 'SET_RECOMENDED_POSTS':
            return { ...state, recomendedPosts: [ ...state.recomendedPosts, ...action.payload]}
        case 'EDIT_TOGGLE':
            return { ...state, editFetchNeeded: action.payload }
        case 'UPDATE_LIKES_ON_POST':
            return {
                ...state,
                recomendedPosts: state.recomendedPosts.map(post => {
                  
                  if (post._id === action.payload.id) {
                    return { ...post, numberOfLikes: action.payload.count };
                  }
                  
                  return post;
                }),
              };
        case 'SET_USER_LIKES':
              return {
                ...state, userLikes: action.payload.postsLiked
              }
        case 'UPDATE_USER_LIKES':
            if (action.payload.liked) {
                return {
                    ...state, userLikes: [...state.userLikes, action.payload.id]
                }
            } else {
                return {
                    ...state, userLikes: state.userLikes.filter((posts) => posts !== action.payload.id)
                }
            }
        default:
            return state
    }
}

export const HomeContextProvider = ({ children }) => { // the object wrapped by this context is called children. In our case, the profile page is the child
    const [state, dispatch] = useReducer(homeReducer, {
        recomendedPosts: [],
        userLikes: [],
        editFetchNeeded: Boolean
    }) // similar to useState, but more powerful. To update the state object, first call the dispatch function. When you call the dispatch function, the reducer functon is invoked. 

    return ( // we want to wrap this around whatever needs profile context
        <HomeContext.Provider value={{ ...state, dispatch }
        }>
            {children}
        </HomeContext.Provider>
    )
}

