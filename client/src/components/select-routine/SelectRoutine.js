import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom'
// import SelectExerciseWt from './SelectExerciseWt';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './SelectRoutine.css'

function SelectRoutine( { userRoutine, currentUser, setLoading, todaysRoutine } ) {

    const history = useHistory()

    const [ errors, setErrors ] = useState([])
    const [ selectLast, setSelectLast ] = useState(false)
    const [ prevRoutine, setPrevRoutine ] = useState([])
    const getWeight = prevRoutine.map(rout => rout.exercise_rxes.map(ex => ex.weight))
    
    // console.log(selectLast)
    // console.log(getWeight.length > 0)
    // console.log(prevRoutine)
    

    console.log(errors)

    const [ selectRoutine, setSelectRoutine ] = useState('')
    const [ routineArray, setRoutineArray ] = useState([])
    const [ date, setDate ] = useState(new Date())
    const [weightInput, setWeightInput] = useState(() => {
        return routineArray.map(() => ({weight : ""})
        )
    })
    
    // console.log(errors.map(re => re.errors.weight))
    // console.log(todaysRoutine)

    function selectLastBox() {
        setSelectLast(selectLast => !selectLast)
    }

    // console.log(selectRoutine)

    // const findExercise = todaysRoutine.find(ex => ex.exercise_routine.routine.name)
// 
    // console.log(findExercise.exercise_routine.routine.id === parseInt(selectRoutine))

    useEffect(() => {
        if (selectLast) {
            fetch(`/last_workout/?id=${selectRoutine}`)
            .then(res => res.json())
            .then(res => setPrevRoutine(res))
        }
    }, [selectLast])

    useEffect(() => {
        // if (findExercise.exercise_routine.routine.id === parseInt(selectRoutine)) {
        //     alert('There is already an exercise routine planned for today.  You will need to delete the routine, then create a new one')
        // } else {
        fetch(`/exercise_routines/?routine_id=${selectRoutine}`)
        .then(res => res.json())
        .then(res => setRoutineArray(res))
    // }
    }, [selectRoutine])

    function handleSelect(e) {
        setSelectRoutine(e)
    }

    function handleChange(e, index) {
        const {name, value} = e.target;
        const list = [...weightInput];
        list[index] = { ...list[index], [name]: parseInt(value, 10) };
        setWeightInput(list)
    }

    // console.log(selectRoutine.length)
    // console.log(routineArray)
    // console.log(weightInput)

    function handleSubmit(e) {
        e.preventDefault();
        setLoading(true);
        
        const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
        const options = { timeZone: 'UTC', month: 'short', day: 'numeric', year: 'numeric' };
        const formattedDate = date.toLocaleDateString('en-US', options);
      
        const promises = routineArray.map((rout, i) => {
          return delay(1000 * i).then(() => {
            const weightInputItem = weightInput[i];
            const routine = weightInputItem && weightInputItem.weight;
            console.log(routine)
      
            return fetch('/exercise_rxes', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                exercise_routine_id: rout.id,
                weight: routine,
                date: formattedDate,
                intensity: 0,
                percent_completed: 0.0,
                completed: null
            })
        })
        .then(res => {
              if (res.ok) {
              history.push(`/users/${currentUser.username}`);
              // return res.json();
              } else {
                  setLoading(false);
                  return res.json()
              }
        })
        .then(data => {
          if (data) {
            setLoading(false);
            setErrors(data.errors)
          }
        })
      })
    });
    Promise.all(promises)
      .then(results => {
          console.log(results);
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
    };

    return(
        <form className='select-routine' onSubmit={handleSubmit}>
            <div className='user-routine-container'>
                <div className='select-routine-label-container r-c'>
                    <div className={`routine-label flex ${selectRoutine.length < 1 ? 'w100' : ''}`}>
                        <h3>Select Routine:</h3>
                        <select onChange={(e) => handleSelect(e.target.value)}>
                            <option value=""></option>
                            {userRoutine.map(rout => 
                            <option value={rout.id} key={rout.id}>{rout.name}</option>)}
                        </select>
                    </div>
                {selectRoutine.length > 0 ?
                    <div className='checkbox-container c-c'>
                        <div className='check-container flex'>
                            <input type='checkbox' onChange={selectLastBox}/><h4> Weight from last exercise?</h4>
                        </div>
                        <div className='check-container flex'>
                            <input type='checkbox'/><h4> Select earlier exercise</h4>
                        </div>
                    </div> : ""}
                    </div>
            <div className='routine-exercises-container'>
                {routineArray.map((rout, index) =>
                <div key={rout.id}>
                <div className='select-exercise-label flex'>
                    <h3>Exercise: {rout.workout.name} ({rout.workout.kind})</h3>
                    {errors ? 
                    <div className='error-weight ht'> 
                        <h6>{errors.weight}</h6>
                        </div> :
                    ""}
                </div>
                <div className='select-exercise-scheme flex' >

                    <div className='exercise-set-rep-counter flex'>
                        <h4>Weight:</h4>
                        <input className='ex-set-counter' type='number' name='weight' min='0' max='2000' step='5' value={selectLast ? parseInt(getWeight[index], 10) : weightInput.weight} onChange={(e) => handleChange(e, index)}/>
                    </div>
                    <div className='exercise-set-rep-counter flex'>
                        <h4>Sets: {rout.sets}</h4>
                    </div>
                    <div className='exercise-set-rep-counter flex'>
                        <h4>Reps: {rout.reps}</h4>
                    </div>
                    <div className='exercise-set-rest-counter flex'>
                        <h4>Rest Intervals: {rout.rest} min.</h4>
                    </div>
                </div>
                </div>
                )}
            </div>
            <div className='date-picker-container r-c'>
                <div className='date-picker-label r-c'>
                    <h4>Workout Date:</h4>
                </div>
                <div className='date-picker-dropdown flex'>
                    <DatePicker 
                    // value={new Date()}
                    name='exercise-date'
                    onChange={(e) => setDate(e)}
                    selected={date}
                    minDate={new Date()}
                />
                </div>
            </div>
            <div className='routine-submit-btn-container r-c'>
                <button className='btn'>Submit</button></div>
            </div>
        </form>
    )
}

export default SelectRoutine;