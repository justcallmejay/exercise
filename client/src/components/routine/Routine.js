import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import ExerciseCard from './ExerciseCard';
import FilterExercise from './FilterExercise';
import { v4 as uuidv4 } from 'uuid';
import Set from './Set';
import BackBtn from '../BackBtn'
import './Routine.css';

//If request fails to pass, open another terminal, go to rails c and put line of code below VVVV
//ActiveRecord::Base.connection.execute("BEGIN TRANSACTION; END;")

function Routine( { currentUser, setLoading } ) {

    const history = useHistory()
    
    const [ error, setError ] = useState([])
    const [ filterDifficulty, setFilterDifficulty ] = useState('All')
    const [ searchInput, setSearchInput ] = useState('')
    const [ routineNm, setRoutineNm ] = useState('')
    const [ exercises, setExercises ] = useState([])
    const [ selectBp, setSelectBp ] = useState('')
    const [ selectExercise, setSelectExercise ] = useState([])
    const parts = ['Glutes', 'Shoulders', 'Quads', 'Hamstrings', 'Abs', 'Back', 'Chest', 'Biceps', 'Triceps', 'Calves', 'Forearm']
    
    console.log(routineNm)
    console.log(error)
    console.log(selectExercise.length)
    
    useEffect(() => {
            fetch(`/workouts/?muscles=${selectBp}`)
            .then(res => res.json())
            .then(res => setExercises(res))
        },[selectBp])
        
    //filter ExerciseCards here

    const filterByDifficulty = exercises.filter(exer => {
      if (filterDifficulty === 'All') return true;

      return exer.difficulty === filterDifficulty
    })

    const searchInputResult = filterByDifficulty.filter(exer => {
      return exer.name.toUpperCase().includes(searchInput.toUpperCase())
    })

    //

    function handleBpSelect(part) {
        setSelectBp(part)
    }

    function handleSelectWorkout(exercise) {
        setSelectExercise([...selectExercise, {
            ...exercise,
            sets: "",
            reps: "",
            rest_intervals: "",
            select_id: uuidv4()
        }])
    }

    function handleUpdateExercise(exerc) {
        setSelectExercise(exer => {
            return exer.map(ex => {
                if (ex.id === exerc.id) {
                    return { ...ex, ...exerc };
                } else {
                    return ex
                }
            })
        })
    }

    function handleDelete(card) {
      const removeExercise = selectExercise.filter(ex => ex.select_id !== card.select_id)
      console.log(removeExercise)
      setSelectExercise(removeExercise)
      // const index = selectExercise.findIndex(exercise => exercise.id === card);
      // if (index !== -1) {
      //   const deleteExercise = [...selectExercise];
      //   deleteExercise.splice(index, 1);
      //   setSelectExercise(deleteExercise);
      // }
    }

    // console.log(selectExercise[1].select_id)

    function handleSubmit(e) {
        e.preventDefault();
        setLoading(true);
        const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

        fetch('/routines', {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: routineNm,
            user_id: currentUser.id,
          })
        })
          .then(res => {
            if (res.ok) {
              res.json()
                .then((res) => {
                  const promises = selectExercise.map((exercise, i) =>
                    delay(1000 * i).then(() => {
                    fetch('/exercise_routines', {
                      method: "POST",
                      headers: { "Content-Type": "application/json" },
                      body: JSON.stringify({
                        routine_id: res.id,
                        workout_id: exercise.id,
                        sets: exercise.sets,
                        reps: exercise.reps,
                        rest: exercise.rest_intervals,
                            })
                        })
                        .then(res => {
                              if (res.ok) {
                                return res.json();
                              } else {
                                setLoading(false);
                                return res.json()
                              }
                            })
                            .then(data => {
                              if (data) {
                                setLoading(false);
                                setError(data.errors)
                              }
                            })
                          })
                          );
                          Promise.all(promises)
                          .then(results => {
                            console.log(results);
                            history.push(`/users/${currentUser.username}`);
                          setLoading(false);
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
                    });
                  }
            //promise from first request
            else {
              setLoading(false);
              return res.json()
            }
          })
          .then(data => {
            //returns errors for no name
            if (data) {
              setLoading(false);
              setError(data.errors)
            }
          })
          .catch(error => {
            console.error(error);
            setLoading(false);
          });
      }
        // console.log(sets)
    return(
        <div className='routine c-c'>
            <form className='user-routine-container' onSubmit={handleSubmit}>

                <div className='routine-label-container wd c-c'>
                  <div className='routine-label-input wd r-c'>
                      <h3>Routine name:</h3>                    
                      <input type='text' value={routineNm} placeholder='Routine Name' onChange={(e) => setRoutineNm(e.target.value)}/>
                  </div>
                    {error ? 
                  <div className='routine-error wd r-c'>
                    <h5>{error.name}</h5>
                  </div>
                  : "" }
                </div>

                <div className='bp-button-container flex'>
                    {parts.map((bp, i) => 
                        <div className='bp-container c-c' key={i} value={bp} onClick={(e) => handleBpSelect(e.target.getAttribute('value'))}>
                            <p value={bp} onClick={(e) => handleBpSelect(e.target.getAttribute('value'))}>{bp}</p>
                        </div>
                        )}
                </div>

                <div className='exercise-selection-container'>

                  {selectBp !== "" ? 
                    <div className='exercise-filter r-c'>
                      <FilterExercise setFilterDifficulty={setFilterDifficulty} searchInput={searchInput} setSearchInput={setSearchInput}/>
                    </div> : "" }
                  
                    <div className='exercise-label flex'>
                        <h4>Select exercise(s): {selectBp? (`${selectBp}`) : "" }</h4>
                    </div>
                    <div className='exercise-card-container flex'>
                    {searchInputResult.map(workout =>
                        <ExerciseCard workout={workout} key={workout.id} handleSelectWorkout={handleSelectWorkout}/>)}
                    </div>

                    <div className='exercise-selected-container flex'>
                      <div className='set-label flex'>
                          <h4>Exercises: ({selectExercise.length})</h4>
                      </div>
                        {selectExercise.map((exercise, i) => 
                        <Set error={error} exercise={exercise} key={uuidv4()} index={i} setSelectExercise={setSelectExercise} handleUpdateExercise={handleUpdateExercise} handleDelete={handleDelete}/>)}
                    </div>
                    {selectBp && selectExercise.length > 0 ?
                    <div className='routine-submit-btn-container r-c'>
                        <button className='btn'>Submit</button>
                    </div>
                    : ""}
                </div>
            </form>
            <BackBtn currentUser={currentUser}/>
        </div>
    )
}

export default Routine;

// function handleSelectWorkout(exercise) {
//     setSelectExercise([...selectExercise, {
//         routine_id: "",
//         exercise_id: exercise.id,
//         sets: "",
//         reps: "",
//         intensity: "",
//         rest_interval: ""
//         }
//     ])
// }