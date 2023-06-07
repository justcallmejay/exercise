import React, { useState } from 'react';
import { RiDeleteBin5Line } from 'react-icons/ri'; 
import './Set.css'

function Set( { exercise, handleUpdateExercise, index, handleDelete, setSelectExercise, error }) {

    // console.log(key)

    console.log(error)

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
        <>
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
            {/* {toggleDisplay ?  */}
            <div className='delete-btn-container r-c' onClick={()=> handleDelete(exercise)}>
                <p><RiDeleteBin5Line/></p>
            </div>
        {/* : ""    */}
        </div>
        {error ? 
        <div className='set-error wd flex'>
            <div className='set-error-msg'>
                <h6>{error.sets}</h6>
            </div>
            <div className='set-error-msg'>
                <h6>{error.reps}</h6>
            </div>
        </div> : "" }
        </>
    )
}

export default Set;