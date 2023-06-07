import React, { useEffect, useState } from 'react'
import ManageTemplate from './ManageTemplate'
import BackBtn from '../BackBtn'
import './ManageRoutine.css'

function ManageRoutine( { currentUser } ) {

    const [ displayAllRoutines, setDisplayAllRoutines] = useState([])
    const [ selectRoutine, setSelectRoutine ] = useState('')
    const [ toggleDeleteMsg, setToggleDeleteMsg ] = useState(false)
    const [ routineArray, setRoutineArray ] = useState("") 


    // console.log(routineArray)

    useEffect(() => {
        fetch(`/routines/?user_id=${currentUser.id}`)
        .then(res => res.json())
        .then(res => setDisplayAllRoutines(res))
    }, [])

    function toggleMsg() {
        setToggleDeleteMsg(toggleDeleteMsg => !toggleDeleteMsg)
    }

    function toggleExitMsg() {
        if (toggleDeleteMsg === true) {
        setToggleDeleteMsg(false)
        }
    }

    function deleteRoutine(rout) {
        toggleMsg()
        fetch(`/routines/${rout}`, {
            method: "DELETE"
        })
        .then((r) => r.json())
        .then((data) => reRenderRoutine(data));
        setRoutineArray([])
    }
    
    function reRenderRoutine(rout) {
        const deletedRoutine = displayAllRoutines.filter(workout => workout.id !== rout)
        setDisplayAllRoutines(deletedRoutine)
    }
    
    useEffect(() => {
            fetch(`/exercise_routines/?routine_id=${selectRoutine}`)
            .then(res => res.json())
            .then(res => handleSelectArray(res))
        }, [selectRoutine])
            
            
    function handleSelectArray(res) {
        setRoutineArray(res)
    }

    return(
        <>
        {toggleDeleteMsg ?
        <div className='delete-display-container c-c'>
            <div className='delete-container c-c'>
                <div className='delete-msg r-c'>
                    <h3>Are you sure you want to delete?  Deleting routine will also delete ALL workout sessions associated with it.</h3>
                </div>
                <div className='delete-decision-btns r-c'>
                    <button className='btn hov' onClick={() => deleteRoutine(selectRoutine)}>YES</button>
                    <button  className='btn hov' onClick={toggleExitMsg}>CANCEL</button>
                </div>
            </div>
        </div>
                : ""
            }
        <div className='manage-routine'>
            <div className='select-created-routine-container flex'>
                <div className='select-routine-container flex'>
                    <h1>Select routine:</h1>
                </div>
                {selectRoutine !== '' ?
                <div className='manage-delete-btn-container r-c'>
                    <button className='btn hov' onClick={toggleMsg}>Delete</button>
                </div>
                : ""}
            </div>
            <div className='routine-select-btn flex'>
                {displayAllRoutines.map(rout => 
                <div className='routine-btn r-c hov' value={rout.id} onClick={(e) => setSelectRoutine(e.target.getAttribute('value'))}>{rout.name}</div>)}
            </div>
            <div className='routine-template-container r-c wd'>
                <ManageTemplate routineArray={routineArray}/>
            </div>
        <BackBtn currentUser={currentUser}/>
        </div>
            </>
    )
}

export default ManageRoutine;

// console.log(displayAllRoutines)
// console.log(selectRoutine)
// console.log(toggleDeleteMsg)

