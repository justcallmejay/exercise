import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import BackBtn from '../BackBtn';
import StartExerciseTemplate from './StartExerciseTemplate';
import IntensityExplained from './IntensityExplained';
import './StartExercise.css';

function StartExercise( { currentUser, todaysRoutine, formattedDate, setLoading }) {
    
    const history = useHistory()
    
    const [ toggleDeleteDisplay, setToggleDeleteDisplay ] = useState(false)
    const [ toggleDisplay, setToggleDisplay ] = useState(false)
    
    // console.log(todaysRoutine)
    function handleToggleDisplay() {
        setToggleDisplay(toggleDisplay => !toggleDisplay)
    }
    
    function handleToggleDeleteDisplay() {
        setToggleDeleteDisplay(toggleDeleteDisplay => !toggleDeleteDisplay)
    }

    function handleSubmit(e) {
        e.preventDefault();
        setLoading(true)
        const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
        const promises = todaysRoutine.map((routine, i) => {
            let finish;
            routine.completed === true ? finish = 100 : finish = routine.percent_completed
            delay(2000 * i).then(() => {
                fetch(`/exercise_rxes/${routine.id}`, {
                    method: "PATCH",
                    headers: {"Content-Type" : "application/json"},
                    body: JSON.stringify({
                    completed: routine.completed,
                    intensity: routine.intensity,
                    percent_completed: finish
                })
            })
            .then(res => {
                if (res.ok) {
                    return res.json();
                } else {
                    console.log(res)
                }
            })
            .then(data => {
                if (data) {
                    setLoading(false)
                    console.log(data.errors)
                }
            })
            .catch(error => {
                setLoading(false)
                console.log(error)
            })
        })
    })
    Promise.all(promises)
    .then(results => {
        console.log(results);
        setLoading(false);
        history.push(`/users/${currentUser.username}`)
          })
          .then(data => {
            if (data) {
                setLoading(false);
                console.log(data.errors)
            }
          })
          .catch(error => {
              console.log(error);
              setLoading(false);
          });
        };


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
                        }).then(res => {
                              if (res.ok) {
                                  return res.json();
                                } else {
                                return res.json();
                                }
                            })
                            .then(data => {
                                if (data) {
                                    setLoading(false);
                                    console.log(data.errors)
                                }
                            })
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
        <>
        {toggleDeleteDisplay ? 
        <div className="delete-display-container r-c">
            <div className='delete-container c-c'>
                <div className='delete-msg r-c'>
                    <h4>Are you sure you want to delete today's exercise?  (The routine will remain intact.)  Selecting 'Yes' will take you to the home page.</h4>
                </div>
                <div className='delete-decision-btns r-c'>
                    <button className='btn' onClick={deleteTodaysWorkout}>Yes</button><button className='btn' onClick={handleToggleDeleteDisplay}>No</button>
                </div>           
            </div>
        </div>
        : ""}

        <div className='start-exercise c-c'>

            {toggleDisplay ? 
            <IntensityExplained handleToggleDisplay={handleToggleDisplay}/>
            : ""}

            <div className='user-routine-container'>
                    <div className='delete-current-routine flex'>
                        <button className='btn' onClick={handleToggleDeleteDisplay}>Delete Weight</button>
                    </div>
            <form className='form' onSubmit={handleSubmit}>
                <div className='current-exercise-label-container flex'>
                    <div className='current-exercise-label'>
                        <h3>Today's Routine:</h3>
                    </div>
                    <div className='date-container'>
                        <h4>Date: {formattedDate}</h4>
                    </div>
                </div>
                <div className='current-exercise-rx-container'>
                    {todaysRoutine.length > 0 ?
                    todaysRoutine.map(exer =>
                        <StartExerciseTemplate exer={exer} key={exer.id} setToggleDisplay={setToggleDisplay} toggleDisplay={toggleDisplay} todaysRoutine={todaysRoutine}/>
                        )
                        : ""
                    }
                </div>
                <div className='start-exercise-container c-c'>
                    <div className='routine-submit-btn-container r-c'>
                        <button className='btn'>Finished</button>
                    </div>
                </div>
            </form>
                <BackBtn currentUser={currentUser}/>
            </div>
        </div>
        </>
    )
}

export default StartExercise;