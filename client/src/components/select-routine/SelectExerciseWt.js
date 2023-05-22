import React, { useState } from 'react';

function SelectExerciseWt( { rout, index } ) {

    const [ weightInput, setWeightInput ] = useState(0)
    return(
        <>
        <div className='select-exercise-label flex'>
            <h3>Exercise: {rout.workout.name} ({rout.workout.kind})</h3>
        </div>
        {Array.from({ length: rout.sets}, (_, i) => 
        <div className='select-exercise-scheme flex' key={`${index}-${i}`}>
            <div className='exercise-set-rep-counter flex'>
                <h4>Set #{i + 1}</h4>
            </div>
            <div className='exercise-set-rep-counter flex'>
                <h4>Weight:</h4>
                <input className='ex-set-counter' type='number' min='0' max='2000' step='5' value={weightInput} onChange={(e) => setWeightInput(e.target.value)}/>
            </div>
            <div className='exercise-set-rep-counter flex'>
                <h4>Reps: {rout.reps}</h4>
            </div>
            <div className='exercise-set-rest-counter flex'>
                <h4>Rest Intervals: {rout.rest} min.</h4>
            </div>
        </div>
        )}
        </>
    )
}

export default SelectExerciseWt;

