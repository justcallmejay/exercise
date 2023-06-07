import React from 'react';
import './ManageRoutine.css'

function ManageTemplate( { routineArray } ) {

    const routineUniq = routineArray.length > 0  ? routineArray.map(rout => { return rout.routine.name}) : ""
    const uniq = [...new Set(routineUniq)]

    console.log(uniq)
    console.log(routineArray)

    return(
        <>
        {routineArray.length > 0 ?
        <div className='routine-template flex'>
            <div className='routine-template-name r-c'>
                <h3>{uniq}</h3>
            </div>
                {routineArray.map(arr => 
                    <div className='routine-template-exercise r-c'>
                        <div className='rout-temp-name ht f-a'>
                            <p>{arr.workout.name}</p><p>({arr.workout.kind})</p>
                        </div>
                        <div className='rout-temp-sr ht f-a'>
                            <p>Sets: {arr.sets}</p>
                        </div>
                        <div className='rout-temp-sr ht f-a'>
                            <p>Reps: {arr.reps}</p>
                        </div>
                        <div className='rout-temp-rr ht f-a'>
                            <p>Rest interval: {arr.rest}</p>
                        </div>
                    </div>
                    )}
        </div>
                     : ""}
            </>
    )
}

export default ManageTemplate;