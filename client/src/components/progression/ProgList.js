import React, { useEffect, useState } from 'react';
import ProgListRoutine from './progListRoutine/ProgListRoutine';
import ProgWoRoutine from './progWoRoutine/ProgWoRoutine';
import './ProgList.css'

function ProgList( { currentUser } ) {

    const [ check, setCheck ] = useState('')
    const [ resultArray, setResultArray ] = useState([])
    const [ selectFilter, setSelectFilter ] = useState('')
    const [ radioArray, setRadioArray ] = useState([]) 

    // console.log(check)
    // console.log(selectFilter)
    console.log(resultArray)
    console.log(radioArray)

    const oneExercise = radioArray.length > 0 ? radioArray.flatMap(arr =>
        arr.workouts.map(err => ({ name: err.name, kind: err.kind, id: err.id }))
      ) : [];
      
      const uniqExercise = [...new Set(oneExercise.map(exercise => JSON.stringify(exercise)))]
        .map(str => JSON.parse(str));

    console.log(uniqExercise)
    
    function handleCheck(e) {
        setCheck(e.target.value)
        setResultArray([])
    }

    function handleDropDownClick(e) {
        setSelectFilter(e.target.value)
    }

    useEffect(() => {
        // let link;
        if (check) {
        //     check === 'routine' ? link = 'all_routines' : link = `routines/?user_id=${currentUser.id}` 
        // }
        fetch(`routines/?user_id=${currentUser.id}`)
        .then(res => res.json())
        .then(res => setRadioArray(res))
    }}, [check])

    useEffect(() => {
        if (check === 'routine') {
            fetch(`/all_exercise_routines/?routine_id=${selectFilter}`)
            .then(res => res.json())
            .then(res => setResultArray(res))
        }
    }, [selectFilter])

    useEffect(() => {
        if (check === 'exercise') {
            fetch(`/data_from_workout/?workout_id=${selectFilter}`)
            .then(res => res.json())
            .then(res => setResultArray(res))
        }
    }, [selectFilter])

    // console.log(resultArray)

    console.log(uniqExercise)


    return (
        <div className='prog-list'>
            <div className='display-filter-container flex'>
                <div className='select-radio-btn-container '>
                    <div className='select-radio r-c'>
                        <h4>Select:</h4>
                    </div>
                    <div className='select-radio r-c'>
                        <input 
                            type='radio'
                            name='routine'
                            value='routine'
                            onChange={(e) => handleCheck(e)}
                            /><h4>Routine</h4>
                    </div>
                    <div className='select-radio r-c'>
                        <input 
                            type='radio'
                            name='routine'
                            value='exercise'
                            onChange={(e) => handleCheck(e)}
                            /><h4>Exercise</h4>
                    </div>
                </div>
                {check ? 
                <div className='select-dropdown-container c-c'>
                    {check ? check.charAt(0).toUpperCase() + check.slice(1) + 's' : ""}
                    <select onChange={(e) => handleDropDownClick(e)}>
                        <option value=''></option>
                        {check === 'routine' ? 
                            radioArray.length > 0 ?
                                radioArray.map(rout =>
                                <option value={rout.id} key={rout.id}>{rout.name}</option>)
                                : "" 
                                :
                            radioArray.length > 0 ? 
                                uniqExercise.map(rout => 
                                <option value={rout.id} key={rout.id}>{rout.name} ({rout.kind})</option>
                                )
                                : ""
                            }
                    </select>
                </div> : ""}
            </div>
                {resultArray.length > 0 ?
            <div className='user-log-result-table r-c'>
                {check === 'routine' ? 
                <div className='prog-list-routine flex'>
                {resultArray.map(hist =>
                <ProgListRoutine hist={hist} key={hist.id}/>
                )}
                </div>
                 : 
                 <div className='user-log-wo-result-table flex'>
                {resultArray.map(hist => 
                <ProgWoRoutine hist={hist}/>)}
                    </div>
                 }
            </div>
            : ""
            }
        </div>
    )
}

export default ProgList;