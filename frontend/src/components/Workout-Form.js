import { useState } from "react"
import { useWorkoutsContext } from "../hooks/use-workouts-context"

const WorkoutForm = () => {
    const { dispatch } = useWorkoutsContext() // allow us to update workout context
    const [title, setTitle] = useState('')
    const [load, setLoad] = useState('')
    const [reps, setReps] = useState('')
    const [error, setError] = useState(null)
    const [emptyFields, setEmptyFields] = useState([])

    const handleSubmit = async (e) => { // async because you are dealing with API
        e.preventDefault() // Don't refresh the page by default

        const workout = { title, load, reps }

        const response = await fetch('/api/workouts', {
            method: 'POST',
            body: JSON.stringify(workout),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        const json = await response.json()

        if (!response.ok) {
            setError(json.error)
            setEmptyFields(json.emptyFields)
        }

        if (response.ok) {
            setTitle('')
            setLoad('')
            setReps('')
            setError(null)
            setEmptyFields([])
            console.log('new workout added', json)
            dispatch({ type: 'CREATE_WORKOUT', payload: json })
        }
    }

    return (
        <form className="create" onSubmit={handleSubmit}>
            <h3>Add a new workout</h3>

            <label>Exercise Title:</label>
            <input
                type="text"
                onChange={(e) => {
                    setTitle(e.target.value)
                }}
                value={title} // bind value to title so if you change title in another function this value will change as well
                className={emptyFields.includes('title') ? 'error' : ''} // style as error class if there is an error
            />

            <label>Load (kg):</label>
            <input
                type="number"
                onChange={(e) => {
                    setLoad(e.target.value)
                }}
                value={load} // bind value to load so if you change load in another function this value will change as well
                className={emptyFields.includes('load') ? 'error' : ''} // style as error class if there is an error
            />

            <label>Reps:</label>
            <input
                type="number"
                onChange={(e) => {
                    setReps(e.target.value)
                }}
                value={reps} // bind value to reps so if you change reps in another function this value will change as well
                className={emptyFields.includes('reps') ? 'error' : ''} // style as error class if there is an error
            />
            <button>Add workout</button>
            {error && <div className="error">{error}</div>}
        </form>
    )
}

export default WorkoutForm