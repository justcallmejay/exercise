import React, { useEffect, useState } from 'react'
import './ManageRoutine.css'

function ManageRoutine( { currentUser } ) {

    const [ displayAllRoutines, setDisplayAllRoutines] = useState([])
    const [ selectRoutine, setSelectRoutine ] = useState('')
    const [ toggleDeleteMsg, setToggleDeleteMsg ] = useState(false)

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

    console.log(typeof(selectRoutine))

    function deleteRoutine(rout) {
        toggleMsg()
        fetch(`/routines/${rout}`, {
            method: "DELETE"
        })
        .then(res => {
            if (!res.ok) {
                throw new Error(`Failed to delete routine (${res.status} ${res.statusText})`);
            }
            return res.json();
        })
        .then(res => reRenderRoutine(res))
        .catch(error => {
            console.error("Error deleting routine:", error);
        });
    }

    function reRenderRoutine(rout) {
        const deletedRoutine = displayAllRoutines.filter(workout => workout.id !== rout.id)
        setDisplayAllRoutines(deletedRoutine)
    }

    console.log(toggleDeleteMsg)


    return(
        <>
        {toggleDeleteMsg ?
        <div className='delete-display-container r-c'>
            <div className='delete-container'>
                <div className='delete-msg r-c'>
                    <h3>Are you sure you want to delete?</h3>
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
                <div className='edit-delete-btn-container r-c'>
                    <button className='btn hov'>Edit</button>
                    <button className='btn hov' onClick={toggleMsg}>Delete</button>
                </div>
                : ""}
            </div>
            <div className='routine-select-btn flex'>
                {displayAllRoutines.map(rout => 
                <div className='routine-btn r-c hov' value={rout.id} onClick={(e) => setSelectRoutine(e.target.getAttribute('value'))}>{rout.name}</div>)}
            </div>
        </div>
            </>
    )
}

export default ManageRoutine;