import { createContext, useReducer } from 'react'

export const WorkoutsContext = createContext() // Allow other files to access this global context

export const workoutsReducer = (state, action) => { // action comes from dispatch
    switch (action.type) {
        case 'SET_WORKOUTS':
            return {
                workouts: action.payload // return all workouts
            }
        case 'CREATE_WORKOUT':
            return {
                workouts: [action.payload, ...state.workouts] // add new workout
            }
        case 'DELETE_WORKOUT':
            return {
                workouts: state.workouts.filter((workout) => workout._id !== action.payload._id) // remove the matching workout
            }
        default:
            return state
    }
}

export const WorkoutsContextProvider = ({ children }) => { // the object wrapped by this context is called children. In our case, the entire app is the child
    const [state, dispatch] = useReducer(workoutsReducer, {
        workouts: null
    }) // similar to useState, but more powerful. To update the state object, first call the dispatch function e.g. dispatch({type: 'CREATE_WORKOUT', payload = [{}, {}]}). When you call the dispatch function, the reducer functon is invoked. 

    return ( // we want to wrap this around whatever needs workout context
        <WorkoutsContext.Provider value={{ ...state, dispatch }}>
            {children}
        </WorkoutsContext.Provider>
    )
}

