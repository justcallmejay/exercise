import React, { useState } from 'react';

function StartExerciseTemplate( { exer, todaysRoutine } ) {

    const [ checkbox, setCheckbox ] = useState(true)
    const [ incomplete, setIncomplete ] = useState(false)
    const [ incompleteSet, setIncompleteSet ] = useState(0)
    const [ incompleteRep, setIncompleteRep ] = useState(0)
    const sum = (exer.exercise_routine.sets * exer.exercise_routine.reps)

    // console.log((exer.exercise_routine.sets * exer.exercise_routine.reps) === (incompleteSet * incompleteRep))
    // console.log(exer.id)
    // console.log(todaysRoutine)
    console.log(incomplete)

    function handleToggleCheckBox() {
        setCheckbox(checkbox => !checkbox)
        exer.completed = checkbox
    }

    function incompleteToggle() {
        setIncomplete(incomplete => !incomplete)
        exer.completed = !incomplete
        exer.percent_completed = incompleteRep / sum
    }

    console.log((incompleteRep / (exer.exercise_routine.sets * exer.exercise_routine.reps)) * 100)

    // console.log(exer.completed)

    return(
        <>
            <div className='select-exercise-scheme flex'>
            <div className='select-exercise-label'>
                    <h4>Exercise: {exer.exercise_routine.workout.name}</h4>
                </div>
                <div className='exercise-set-rep-counter flex'>
                    <h5>Wt:{exer.weight}</h5>    
                </div>
                <div className='exercise-set-rep-counter flex'>
                    <h5>Sets: {exer.exercise_routine.sets}</h5>    
                </div>
                <div className='exercise-set-rep-counter flex'>
                    <h5>Reps:{exer.exercise_routine.reps}</h5>    
                </div>
                <div className='exercise-set-rep-counter flex'>
                    <h5>Rest: {exer.exercise_routine.rest}</h5>    
                </div>
            </div>
            <div className='select-exercise-scheme flex'>
                <div className='exercise-set-rep-counter flex'>
                    <h5>Intensity:</h5>    
                </div>
                <div className='exercise-set-rep-counter flex'>
                    <div className='exercise-set-rep-counter-label-container'>
                        <h5>Completed?</h5>
                    </div>
                    <div className='exercise-set-rep-counter-label-checkbox'>
                        <div className='exericse-checkbox-yes r-c'>
                            <input type='checkbox' name='completed' onChange={ handleToggleCheckBox}/>
                            <h5>Yes</h5>
                        </div>
                        <div className='exericse-checkbox-no r-c'>
                            <input type='checkbox' name='completed' onChange={incompleteToggle}/>
                            <h5>No</h5>
                        </div>
                    </div>
                </div>
                {incomplete ? 
                <div className='incomplete-set-rep-container r-c'>
                    <h6>If incompleted: </h6>
                    <h6>Reps done:</h6><input type='number' min='0' max={sum - 1} value={incompleteRep} onChange={(e) => setIncompleteRep(e.target.value)}/>
                </div> : ""}
            </div>
        </>
    )
}

export default StartExerciseTemplate;