import React from 'react';
import './ProgListRoutine.css'
import { BsCheck2 } from 'react-icons/bs'
import { HiXMark } from 'react-icons/hi2'

function ProgListRoutine( { hist } ) {

    const sortByDate = hist?.exercise_rxes?.sort(function(a, b) {
        return new Date(a.date) - new Date(b.date)
    })
    
    return(
        <div className='prog-list-container-thing flex'>
            <div className='prog-list-routine-exercise r-c'>
                    <div className='prog-label c-c'>
                        <h3>{hist?.workout?.name}({hist?.workout?.kind})</h3>
                    </div>
                    <div className='prog-stats-label'>
                        <div className='prog-label-attr flex'>
                            <h4>Date:</h4>
                        </div>
                        <div className='prog-label-attr flex'>
                            <h4>Weight:</h4>
                        </div>
                        <div className='prog-label-attr flex'>
                            <h4>Sets:</h4>
                        </div>
                        <div className='prog-label-attr flex'>
                            <h4>Reps:</h4>
                        </div>
                        <div className='prog-label-attr flex'>
                            <h4>Intensity:</h4>
                        </div>
                        <div className='prog-label-attr flex'>
                            <h4>Completed?</h4>
                        </div>
                    </div>
            </div>
        {sortByDate?.map(rout => {
            const result = rout.completed ? <BsCheck2 /> : <HiXMark/>
            const date = new Date(rout.date)
            const options = { timeZone: 'UTC', month: 'short', day: 'numeric' };
            const formattedDate = date.toLocaleDateString('en-US', options)
            console.log(rout.completed)
        return(
                    <div className='prog-user-stats-container c-c' key={rout.id}>
                        <div className='prog-stats r-c'>
                            <h3>{formattedDate}</h3>
                        </div>
                        <div className='prog-stats r-c'>
                            <h3>{rout.weight} lbs.</h3>
                        </div>
                        <div className='prog-stats r-c'>
                            <h3>{hist.sets}</h3>
                        </div>
                        <div className='prog-stats r-c'>
                            <h3>{hist.reps}</h3>
                        </div>
                        <div className='prog-stats r-c'>
                            <h3>{rout.intensity != 0 ? `${rout.intensity}` : "--"}</h3>
                        </div>
                        <div className='prog-stats r-c'>
                            <h3 className={rout.completed ? "complete" : "incomplete"}>{result}</h3>
                        </div>
                    </div>
)}
)}
        </div>
    )
}

export default ProgListRoutine;

{/* <h3>{hist.workout.name}({hist.workout.kind})</h3>
{hist.exercise_rxes.map(wt => {
    const date = wt.date
    const formattedDate = date.toLocaleDateString('en-US', options);
return(
    <>
<h3>{formattedDate}</h3>
<h3>{wt.weight}</h3>
</>
    )
}
)}
<h3>Sets: {hist.sets}</h3>
<h3>Reps: {hist.reps}</h3>
<h3>Rest: {hist.rest}</h3> */}

