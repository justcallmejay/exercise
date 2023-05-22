import React from 'react';
import './StartExercise.css';

function StartExercise() {
    return(
        <div className='start-exercise'>
            <div className='user-routine-container'>
                <div className='current-exercise-label-container c-c'>
                    <div className='current-exercise-label c-c'>
                        <h3>Today's Routine:</h3>
                    </div>
                    <div className='date-container'>
                        <h4>Date:</h4>
                    </div>
                </div>
                <div className='current-exercise-rx-container'>
                    <h4>Exercises:</h4>

                    {/*
                    {Array.from({ length: rout.sets}, {_, i} =>
                    
                    })
                    */}
                </div>
            </div>
        </div>
    )
}

export default StartExercise;