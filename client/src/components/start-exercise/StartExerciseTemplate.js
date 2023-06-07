import React, { useEffect, useState } from 'react';
import { HiOutlineInformationCircle } from 'react-icons/hi'

function StartExerciseTemplate( { exer, setToggleDisplay } ) {

    const sum = (exer.exercise_routine.sets * exer.exercise_routine.reps)
    const number = [1, 1.5, 2, 2.5, 3, 3.5, 4, 4.5, 5, 5.5, 6, 6.5, 7, 7.5, 8, 8.5, 9, 9.5, 10]

    const [ checkbox, setCheckbox ] = useState('incomplete')
    // const [ incomplete, setIncomplete ] = useState(false)
    // const [ incompleteSet, setIncompleteSet ] = useState(0)
    const [ incompleteRep, setIncompleteRep ] = useState(0)
    const [ perceivedExertion, setPerceivedExertion ] = useState(0)

    console.log(checkbox)

    
    // const [ toggleIntensityDisplay, setToggleIntensityDisplay ] = useState(false)
    // console.log((exer.exercise_routine.sets * exer.exercise_routine.reps) === (incompleteSet * incompleteRep))
    // console.log(exer.id)
    // console.log(todaysRoutine)
    
    // function handleToggleCheckBox() {
    //     setCheckbox(checkbox => !checkbox)
    //     exer.completed = checkbox
    // }

    console.log(exer.intensity)
    
    function handleintensityChange(e) {
        if (checkbox === 'incomplete') {
            exer.intensity = 10
        } else {
            setPerceivedExertion(exer.intensity = e.target.value);
            exer.intensity = e.target.value
        }
      }
    // console.log(exer.intensity)
    // console.log(perceivedExertion)

    useEffect(() => {
        if (checkbox === 'incomplete') {
            exer.completed = false
        } else if (checkbox === 'complete') {
            exer.completed = true
        }
    }, [checkbox])

    function handleIncompleteReps(e) {
        setIncompleteRep(e)
        // exer.completed = incomplete
        exer.percent_completed = (incompleteRep / sum * 100)
    }

    function toggleEnter() {
        setToggleDisplay(toggleDisplay => !toggleDisplay)
    }

    console.log(exer.percent_completed)

    // console.log((incompleteRep / (exer.exercise_routine.sets * exer.exercise_routine.reps)) * 100)

    // console.log(toggleIntensityDisplay)

    return(
        <>
            <div className='select-exercise-scheme flex'>
                <div className='select-exercise-label flex'>
                    <h4>Exercise: {exer.exercise_routine.workout.name}</h4><h4> ({exer.exercise_routine.workout.kind})</h4>
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
                        <div className='exericse-checkbox-no r-c'>
                            <input type='radio' checked={checkbox === 'incomplete'} default='incomplete' value='incomplete' onChange={(e) => setCheckbox(e.target.value)}/>
                            <h5>No</h5>
                        </div>
                        <div className='exericse-checkbox-yes r-c'>
                            <input type='radio' checked={checkbox === 'complete'} value='complete' onChange={(e) => setCheckbox(e.target.value)}/>
                            <h5>Yes</h5>
                        </div>
                    </div>
                </div>
                {checkbox === 'complete' ?
                <div className='set-intensity-container flex'>
                    <div className='complete-set-label r-c'>
                        <p>How intense was the last set?</p>
                    </div>
                    <div className='complete-set-icon r-c' onClick={toggleEnter}>
                        < HiOutlineInformationCircle />
                    </div>
                    <div className='complete-set-input ht flex'>
                        <select onChange={(e) => handleintensityChange(e)}>
                            {number.map((num, i) => 
                            <option value={num} key={i}>{num}</option>)}
                        </select>
                         {/* <input type='number' min='1' max='10'  step='0.5' value={perceivedExertion} onChange={(e) => handleintensityChange
                        (e)}/> */}
                     </div>
                </div> : "" }
                {checkbox === 'incomplete' ? 
                <div className='set-intensity-container flex'>
                    <div className='incomplete-set-label r-c'>
                        <p>If incompleted, enter total reps done for this exercise:</p>
                    </div>                    
                    <div className='incomplete-set-input ht flex'>
                        <input type='number' min='0' max={sum - 1} value={incompleteRep} onChange={(e) => handleIncompleteReps(e.target.value)}/>
                    </div>
                </div> : ""}
                </div>

                    </>
    )
}

export default StartExerciseTemplate;