import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import ExerciseCard from './ExerciseCard';
import Set from './Set';
import './Routine.css';

function Routine( { currentUser } ) {

    const history = useHistory()

    const [ routineNm, setRoutineNm ] = useState('')
    const [ exercises, setExercises ] = useState([])
    const [ selectBp, setSelectBp ] = useState('')
    const [ selectExercise, setSelectExercise ] = useState([])
    const parts = ['Glutes', 'Shoulders', 'Quads', 'Hamstrings', 'Abs', 'Back', 'Chest', 'Biceps', 'Triceps', 'Calves', 'Forearm']


    console.log(routineNm)

    function handleBpSelect(part) {
        setSelectBp(part)
    }

    function handleSelectWorkout(exercise) {
        setSelectExercise([...selectExercise, {
            ...exercise,
            sets: "",
            reps: "",
            rest_intervals: ""
        }])
    }

    function handleUpdateExercise(exerc) {
        setSelectExercise(exer => {
            return exer.map(ex => {
                if (ex.id === exerc.id) {
                    return { ...ex, ...exerc };
                } else {
                    return ex
                }
            })
        })
    }

    function handleDelete(card) {
        const deleteExercise = selectExercise.filter(ex => ex.id !== card.id)
        setSelectExercise(deleteExercise)
    }

    console.log(selectExercise)

    function handleSubmit(e) {
        e.preventDefault();
        fetch('/routines', {
            method: "POST",
            headers: {"Content-Type" : "application/json"},
            body: JSON.stringify({
                name: routineNm,
                user_id: currentUser.id,
            })
        })
        .then(res => {
            if (res.ok) {
                res.json()
                .then((res) => {
                    {
                        Promise.all(selectExercise.map(exercise => 
                        fetch('/exercise_routines', {
                            method: "POST",
                            headers: {"Content-Type" : "application/json"},
                            body: JSON.stringify({
                            routine_id: res.id,
                            workout_id: exercise.id,
                            sets: exercise.sets,
                            reps: exercise.reps,
                            rest: exercise.rest_intervals,
                        })
                    })
                    .then(res => res.json())
                    .then(res => console.log(res))
                    .catch(error => {
                        console.error(error);
                    })
                    ))}
                    history.push(`/users/${currentUser.username}`)
                })
                //braces below for if statement  
            }
        })
    }

    useEffect(() => {
            fetch(`/workouts/?muscles=${selectBp}`)
            .then(res => res.json())
            .then(res => setExercises(res))
        },[selectBp])

        // console.log(sets)

    return(
        <div className='routine'>
            <form className='user-routine-container' onSubmit={handleSubmit}>
                <div className='routine-label-container flex'>
                        <h3>Routine name:</h3>                    
                        <input type='text' value={routineNm} placeholder='Routine Name' onChange={(e) => setRoutineNm(e.target.value)}/>
                </div>
                <div className='bp-button-container flex'>
                    {parts.map((bp, i) => 
                        <div className='bp-container c-c' key={i} value={bp} onClick={(e) => handleBpSelect(e.target.getAttribute('value'))}>
                            <p value={bp} onClick={(e) => handleBpSelect(e.target.getAttribute('value'))}>{bp}</p>
                        </div>
                        )}
                </div>
                <div className='exercise-selection-container'>
                    <div className='exercise-filter'>

                    </div>
                    <div className='exercise-label flex'>
                        <h4>Pick exercise(s):</h4>
                    </div>
                    <div className='exercise-card-container r-c'>
                    {exercises.map(workout =>
                        <ExerciseCard workout={workout} key={workout.id} handleSelectWorkout={handleSelectWorkout}/>)}
                    </div>
                    <div className='exercise-selected-container flex'>
                    <div className='set-label flex'>
                        <h4>Exercises: ({selectExercise.length})</h4>
                    </div>
                    {selectExercise.map((exercise, i) => 
                        <Set exercise={exercise} key={exercise.id} index={i} setSelectExercise={setSelectExercise} handleUpdateExercise={handleUpdateExercise} handleDelete={handleDelete}/>)}
                    </div>
                    <div className='routine-submit-btn-container r-c'>
                        <button className='btn'>Submit</button>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default Routine;

// function handleSelectWorkout(exercise) {
//     setSelectExercise([...selectExercise, {
//         routine_id: "",
//         exercise_id: exercise.id,
//         sets: "",
//         reps: "",
//         intensity: "",
//         rest_interval: ""
//         }
//     ])
// }