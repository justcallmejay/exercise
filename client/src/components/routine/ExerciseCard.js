import React from 'react';
import './ExerciseCard.css'

function ExerciseCard( { workout, handleSelectWorkout } ) {
    return(
        <div className='exercise-card' onClick={() => handleSelectWorkout(workout)}>
            <div className='exercise-img c-c'>
                <p>img</p>
            </div>
            <div className='workout-label-container flex'>
                <h6>Exercise: {workout.name}</h6>
                <h6>Equipmenet: {workout.kind}</h6>
            </div>
        </div>
    )
}

export default ExerciseCard;