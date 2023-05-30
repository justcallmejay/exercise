import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom'
import StartExerciseTemplate from './StartExerciseTemplate'
import './StartExercise.css';

function StartExercise( { currentUser, todaysRoutine, formattedDate, setLoading }) {

    const history = useHistory()

    console.log(todaysRoutine)

    function handleSubmit(e) {
        e.preventDefault();
        // setLoading(true)

        const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

        (todaysRoutine.map((routine, i) =>
        delay(2000 * i).then(() => {
        
        fetch(`/exercise_rxes/${routine.id}`, {
            method: "PATCH",
            headers: {"Content-Type" : "application/json"},
            body: JSON.stringify({
                completed: routine.completed
            })
        })
        .then(res => {
            if (res.ok) {
                // setLoading(false)
                // history.push(`/users/${currentUser.username}`)
            }
        // }res.json())
        // .then(res => console.log(res))
            })
        })
        ))
    }

    function deleteTodaysWorkout() {
        setLoading(true);
        const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
        const promises = todaysRoutine.map((routine, i) => {
          return delay(2000 * i).then(() => {
            const date = new Date(routine.date);
            const options = { timeZone: 'UTC', month: 'short', day: 'numeric', year: 'numeric' };
            const formattedRoutineDate = date.toLocaleDateString('en-US', options);
            if (formattedRoutineDate === formattedDate) {
                    return fetch(`/exercise_rxes/${routine.id}`, {
                          method: "DELETE"
                        }).then((res) => {
                              if (!res.ok) {
                                    throw new Error("Failed to delete exercise routine");
                                  }
                                  return res.json();
                                });
                              }
                            });
                        });
        Promise.all(promises)
          .then(() => {
                setLoading(false);
                history.push(`/users/${currentUser.username}`);
              })
              .catch((error) => {
                    console.log(error);
                    setLoading(false);
            })
          };

    return(
        <div className='start-exercise'>
            <div className='user-routine-container'>
                <div className='current-exercise-label-container flex'>
                    <div className='current-exercise-label'>
                        <h3>Today's Routine:</h3>
                    </div>
                    <div className='date-container'>
                        <h4>Date: {formattedDate}</h4>
                    </div>
                    <div className='delete-current-routine r-c'>
                        <button className='btn' onClick={deleteTodaysWorkout}>Delete</button>
                    </div>
                </div>

                <div className='current-exercise-rx-container'>
                    {todaysRoutine.length > 0 ?
                    todaysRoutine.map(exer =>
                    <StartExerciseTemplate exer={exer} todaysRoutine={todaysRoutine}/>
                    )
                     : ""
                }
                </div>
                <div className='start-exercise-container c-c'>
                    <div className='routine-submit-btn-container r-c'>
                        <button className='btn'>Finished</button>
                    </div>
                </div>
            </div>
            <div className='back-btn-container flex'>
                <Link to={`/users/${currentUser.username}`}>
                    <p>{`<< Back`}</p>
                </Link>
            </div>
        </div>
    )
}

export default StartExercise;