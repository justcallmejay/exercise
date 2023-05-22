import React, { useState } from 'react';
import './Set.css'

function Set( { exercise, handleUpdateExercise, index, handleDelete, setSelectExercise }) {

    const [ toggleDisplay, setToggleDisplay ] = useState(false)

    function handleChange(e, index) {
        const { name, value} = e.target
        setSelectExercise((exer) => {
            return exer.map((exerci, i) => {
                if (i === index) {
                    return {...exerci, [name]: value};
                }
                return exerci
            })
        })
        // const updatedExercise = { ...exercise, [name]:value};
        // handleUpdateExercise(updatedExercise)
    }

    function handleEnter() {
        setToggleDisplay(toggleDisplay => !toggleDisplay)
    }

    function handleLeave() {
        setToggleDisplay(toggleDisplay => !toggleDisplay)
    }

    console.log(toggleDisplay)

    return(
        <div className='exercise-set flex' onMouseEnter={handleEnter} onMouseLeave={handleLeave}>
            <div className='exercise-set-label flex'>
                <h4>{exercise.name} ({exercise.kind})</h4>
            </div>
            <div className='exercise-set-rep-counter r-c'>
                <h4>Sets:</h4>
                <input className='ex-set-counter' name='sets' type='number' min='0' max='100' 
                value={exercise.sets} 
                onChange={(e) => handleChange(e, index)}
                />
            </div>
            <div className='exercise-set-rep-counter flex'>
                <h4>Reps:</h4>
                <input className='ex-set-counter' name='reps' type='number' min='0' max='100' 
                value={exercise.reps} 
                onChange={(e) => handleChange(e, index)}
                />
            </div>
            <div className='exercise-rest-counter flex'>
                <h4>Rest Interval:</h4>
                <input className='ex-set-counter' name='rest_intervals' type='number' min='1' max='10' 
                value={exercise.rest_intervals} 
                onChange={(e) => handleChange(e, index)}
                />
            </div>
            {toggleDisplay ? 
            <div className='delete-btn-container flex' onClick={()=> handleDelete(exercise)}>
                <p>X</p>
            </div>
        : ""    }
        </div>
    )
}

export default Set;