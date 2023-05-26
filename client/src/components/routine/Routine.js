import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import ExerciseCard from './ExerciseCard';
import FilterExercise from './FilterExercise';
import { v4 as uuidv4 } from 'uuid';
import Set from './Set';
import './Routine.css';

//If request fails to pass, open another terminal, go to rails c and put line of code below VVVV
//ActiveRecord::Base.connection.execute("BEGIN TRANSACTION; END;")

function Routine( { currentUser, setLoading } ) {

    const history = useHistory()
    const generatedUuid = uuidv4();

    const [ filterDifficulty, setFilterDifficulty ] = useState('All')
    const [ searchInput, setSearchInput ] = useState('')
    const [ routineNm, setRoutineNm ] = useState('')
    const [ exercises, setExercises ] = useState([])
    const [ selectBp, setSelectBp ] = useState('')
    const [ selectExercise, setSelectExercise ] = useState([])
    const parts = ['Glutes', 'Shoulders', 'Quads', 'Hamstrings', 'Abs', 'Back', 'Chest', 'Biceps', 'Triceps', 'Calves', 'Forearm']

    console.log(routineNm)

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
            rest_intervals: ""
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
      const index = selectExercise.findIndex(exercise => exercise.id === card);
      if (index !== -1) {
        const deleteExercise = [...selectExercise];
        deleteExercise.splice(index, 1);
        setSelectExercise(deleteExercise);
      }
    }

    console.log(selectExercise)

    function handleSubmit(e) {
        e.preventDefault();
        setLoading(true);
      
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
                  const promises = selectExercise.map(exercise =>
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
                    }).then(res => {
                      if (res.ok) {
                        return res.json();
                      } else {
                        throw new Error("Failed to create exercise routine.");
                      }
                    })
                  );
      
                  Promise.all(promises)
                    .then(results => {
                      console.log(results);
                      setLoading(false);
                      history.push(`/users/${currentUser.username}`);
                    })
                    .catch(error => {
                      console.error(error);
                      setLoading(false);
                    });
                });
            }
          })
          .catch(error => {
            console.error(error);
            setLoading(false);
          });
      }

    useEffect(() => {
            fetch(`/workouts/?muscles=${selectBp}`)
            .then(res => res.json())
            .then(res => setExercises(res))
        },[selectBp])

        // console.log(sets)

    return(
        <div className='routine'>
            <form className='user-routine-container' onSubmit={handleSubmit}>
                <div className='routine-label-container flex'>
                        <h3>Routine name:</h3>                    
                        <input type='text' value={routineNm} placeholder='Routine Name' onChange={(e) => setRoutineNm(e.target.value)}/>
                </div>
                <div className='bp-button-container flex'>
                    {parts.map((bp, i) => 
                        <div className='bp-container c-c' key={i} value={bp} onClick={(e) => handleBpSelect(e.target.getAttribute('value'))}>
                            <p value={bp} onClick={(e) => handleBpSelect(e.target.getAttribute('value'))}>{bp}</p>
                        </div>
                        )}
                </div>
                <div className='exercise-selection-container'>
                    <div className='exercise-filter r-c'>
                      <FilterExercise setFilterDifficulty={setFilterDifficulty} searchInput={searchInput} setSearchInput={setSearchInput}/>
                    </div>
                    <div className='exercise-label flex'>
                        <h4>Pick exercise(s):</h4>
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
                        <Set exercise={exercise} key={uuidv4()} index={i} setSelectExercise={setSelectExercise} handleUpdateExercise={handleUpdateExercise} handleDelete={handleDelete}/>)}
                    </div>
                    <div className='routine-submit-btn-container r-c'>
                        <button className='btn'>Submit</button>
                    </div>
                </div>
            </form>
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