import React, { useEffect, useState } from 'react';
import SelectExerciseWt from './SelectExerciseWt';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './SelectRoutine.css'

function SelectRoutine( { userRoutine } ) {

    const [ selectRoutine, setSelectRoutine ] = useState('')
    const [ routineArray, setRoutineArray ] = useState([])
    const [ weightInput, setWeightInput ] = useState(0)


    useEffect(() => {
        fetch(`/exercise_routines/?routine_id=${selectRoutine}`)
        .then(res => res.json())
        .then(res => setRoutineArray(res))
    }, [selectRoutine])

    function handleSelect(e) {
        setSelectRoutine(e)
    }

    console.log(selectRoutine)
    console.log(routineArray)

    return(
        <div className='select-routine'>
            <div className='user-routine-container'>
                <div className='routine-label-container flex'>
                    <h3>Select Routine:</h3>
                    <select onChange={(e) => handleSelect(e.target.value)}>
                        <option value=""></option>
                        {userRoutine.map(rout => 
                        <option value={rout.id} key={rout.id}>{rout.name}</option>)}
                    </select>
                </div>
                <div className='routine-exercises-container'>
                    {/*Insert map exercises here*/}
                    {routineArray.map((rout, index) => 
                    <SelectExerciseWt rout={rout} index={index}/>
                    )}
                </div>
                <div className='date-picker-container r-c'>
                    <div className='date-picker-label r-c'>
                        <h4>Workout Date:</h4>
                    </div>
                    <div className='date-picker-dropdown flex'>
                        <DatePicker 
                        name='exercise-date'
                       // onChange={}
                        selected={new Date()}
                        minDate={new Date()}
                    />
                    </div>
                </div>
                <div className='routine-submit-btn-container r-c'>
                    <button className='btn'>Submit</button></div>
            </div>
        </div>
    )
}

export default SelectRoutine;