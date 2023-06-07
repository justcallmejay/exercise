import React from 'react';
import './ProgWoRoutine.css'
import { BsCheck2 } from 'react-icons/bs'
import { HiXMark } from 'react-icons/hi2'

function ProgWoRoutine( { hist } ) {

    const sortByDate = hist?.exercise_rxes?.sort(function(a, b) {
        return new Date(a.date) - new Date(b.date)
    })

    return(
        <div className='prog-wo-container-stuff flex'>
            <div className='prog-wo '>
                <div className='prog-wo-label r-c'>
                    <h3>{hist?.workout?.name} ({hist?.workout?.kind})</h3>
                </div>
                <div className='prog-wo-attr-container'>
                    <div className='prog-wo-attr-label r-c'>
                        <h3>Routine:</h3>
                    </div>
                    <div className='prog-wo-attr-label r-c'>
                        <h3>Date:</h3>
                    </div>
                    <div className='prog-wo-attr-label r-c'>
                        <h3>Sets:</h3>
                    </div>
                    <div className='prog-wo-attr-label r-c'>
                        <h3>Reps:</h3>
                    </div>
                    <div className='prog-wo-attr-label r-c'>
                        <h3>Rest:</h3>
                    </div>
                    <div className='prog-wo-attr-label r-c'>
                        <h3>Completed:</h3>
                    </div>
                </div>
           </div>
           {sortByDate?.map(rout => {
                        const result = rout.completed ? <BsCheck2 /> : <HiXMark/>
                        const date = new Date(rout.date)
                        const options = { timeZone: 'UTC', month: 'short', day: 'numeric' };
                        const formattedDate = date.toLocaleDateString('en-US', options)
                        return (
            <div className='prog-wo-user-stats-container c-c' key={rout.id}>
                    <div className='prog-wo-attr-stats r-c'>
                        <h4>{hist?.routine?.name}</h4>
                    </div>
                    <div className='prog-wo-attr-stats r-c'>
                        <h4>{formattedDate}</h4>
                    </div>
                    <div className='prog-wo-attr-stats r-c'>
                        <h4>{hist.sets}</h4>
                    </div>
                    <div className='prog-wo-attr-stats r-c'>
                        <h4>{hist.reps}</h4>
                    </div>
                    <div className='prog-wo-attr-stats r-c'>
                        <h4>{hist.rest}</h4>
                    </div>
                    <div className='prog-wo-attr-stats r-c'>
                    <h3 className={rout.completed ? "complete" : "incomplete"}>{result}</h3>
                    </div>
            </div>
            )}
            )}
        </div>
    )
}

export default ProgWoRoutine;