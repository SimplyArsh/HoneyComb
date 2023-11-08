import { WorkoutsContext } from '../context/Workout-Context'
import { useContext } from "react"

export const useWorkoutsContext = () => { // create a hook
    const context = useContext(WorkoutsContext) // returns the value of this context, which in this case is the value we pass into the WorkoutsContext.Provider

    if (!context) { // if this hook is used wrongly, throw an error
        throw Error('useWorkoutContext must be used inside a WorkoutsContextProvider')
    }

    return context
}