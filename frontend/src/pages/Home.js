// Libraries

import { useEffect } from 'react'
import { useWorkoutsContext } from "../hooks/use-workouts-context"

// Components
import WorkoutDetails from '../components/Workout-Details'
import WorkoutForm from '../components/Workout-Form'

const Home = () => {
    const { workouts, dispatch } = useWorkoutsContext()

    useEffect(() => {
        const fetchWorkouts = async () => {
            const response = await fetch('/api/workouts') // connect to database. In package.json, "proxy" = "http://localhost:4000". /api/workouts is added onto the proxy
            const json = await response.json()

            if (response.ok) {
                dispatch({ type: 'SET_WORKOUTS', payload: json })
            } // set workout state if response found
        }

        fetchWorkouts()

    }, [dispatch]) // hooks, [dispatch] means whenever dispatch changes, this function will fire

    return (
        <div className="home">
            <div classname="workouts">
                {workouts && workouts.map((workout) => (
                    <WorkoutDetails key={workout._id} workout={workout} />
                ))}
            </div>
            <WorkoutForm />
        </div>
    )
}

export default Home