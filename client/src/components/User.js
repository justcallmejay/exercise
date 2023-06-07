import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import './User.css'

function User( { updateUser, userRoutine, setLoading, date, setUserRoutine, formattedDate, currentUser, setTodaysRoutine, todaysRoutine } ) {
    
    const last_weight = currentUser.weights.map(wt => { return ((wt.weight))})
    const last_converted = (Number(last_weight[last_weight.length - 1]))

    const userSignUp = new Date(currentUser.created_at);
    const timeDifference = Math.abs(userSignUp.getTime() - date.getTime())
    const timeDiff = Math.ceil(timeDifference / (1000 * 60 * 60 * 24))
    
    const [errors, setErrors] = useState([])
    const [ userWeight, setUserWeight ] = useState(last_converted)
    const [ updateWeight, setUpdateWeight ] = useState(false)
    const [ updateEnabled, setUpdateEnabled ] = useState(false)
    
    const hasOne = userRoutine.length > 0 
    const hasOneAndTodaysRoutine = todaysRoutine.length > 0
    
    const history = useHistory()
    
        useEffect(() => {
            if (timeDiff === 1) {
                setUpdateEnabled(true)
            }
        }, [])

    function handleLogout() {
        fetch('/logout', {
            method: 'DELETE'
        })
        .then(res => {
            if (res.ok) {
                updateUser(null)
                history.push('/')
            }
        })
    }

    useEffect(() => {
        if (currentUser !== false) {
        fetch(`/routine_names/?user_id=${currentUser.id}`)
        .then(res => {
            if (res.ok) {
                res.json().then(res => {
                    (setUserRoutine(res))
                })
            } 
        })
        .catch(error => {
            console.log(error)
        })    
        }
      }, [])

      useEffect(() => {
        if (currentUser !== false) {
        setLoading(true)
        fetch(`/last_routine/?date=${formattedDate}`)
        .then(res => {
            if (res.ok) {
                res.json().then(res => {
                    (setTodaysRoutine(res))
                    setLoading(false)
                    })
                }
            })
                .then(data => {
                    if (data) {
                        setLoading(false)
                        setErrors(data.errors)
                    }
                })
                .catch(error => {
                    setLoading(false)
                    console.log(error)
                })
            }
        }, [hasOneAndTodaysRoutine])

    function toggleUpdateWeight() {
        setUpdateWeight(updateWeight => !updateWeight)
    }

    function handleUpdateWtChange(e) {
        setUserWeight(e.target.value)
    }

    function handleWeightChange() {
        fetch('/weights', {
            method: "POST",
            headers: {"Content-Type" : "application/json"},
            body: JSON.stringify({
                weight: userWeight,
                user_id: currentUser.id
            })
        })
        .then(res => {
            if (res.ok) {
                setUpdateWeight(false)
                setUpdateEnabled(false)
                return res.json()
            } else {
                return res.json()
            }
        })
        .then((data) => {
            if (data) {
                setUpdateEnabled(false)
                setUpdateWeight(false)
                console.log(data.error)
            }
        })
    }



    return(
        <div className="user c-c">
            <div className='user-header wd flex'>
                    <h4>Some Exercise App</h4>
                    <p>Date: {formattedDate}</p>
                    <button className='btn hm-btn' onClick={handleLogout}>Logout</button>
            </div>
            <div className='userpg-containerr flex'>
                <div className='userpg-info-container wd flex'>
                    <div className='userpg-img ht c-c'>
                        <p className='c-c'>img</p>
                    </div>
                    <div className='userpg-info ht flex'>
                        <h4>Name:</h4>
                        <h4>Height:</h4>
                        <h4>Weight:</h4>
                    </div>
                    <div className='userpg-stat ht'>
                        <p>{currentUser.name}</p>
                        <span>{currentUser.feet} ft.{currentUser.inches} in.</span>
                        {updateWeight ?
                            <div className='flex'>
                                <input className='input-wt' type="number" step='0.1' value={userWeight} onChange={(e) => handleUpdateWtChange(e)}/>
                                <button onClick={handleWeightChange}>Update</button>
                                <button onClick={toggleUpdateWeight}>Cancel</button>
                            </div>
                            :
                                <>
                            <div className='flex'>
                                <div className='user-weight-container'>
                                    <p>{userWeight} lbs.</p>
                                </div>
                            {updateEnabled ?
                                <div className='user-update-link flex'>
                                    <p className='user-link' onClick={toggleUpdateWeight}>update weight</p>
                                    {errors ? 
                                    <div className='error-container'>
                                        {errors.weight}
                                        </div>
                                    : ""}
                                </div>
                                : 
                                ""}
                            </div>
                            </>
                        }
                    </div>
                </div>
                <div className='userpg-container wd c-c'>
                    <Link to={hasOneAndTodaysRoutine & hasOne ? '/start-exercise' : "#"}>
                        <button className={`userpg-btn hm-btn ${hasOneAndTodaysRoutine & hasOne ? "" : "not-allowed"}`}>{hasOneAndTodaysRoutine & hasOne ? 'BEGIN EXERCISE' : 'Create Routine Below'}</button>
                    </Link>
                    <Link to={hasOne ? hasOneAndTodaysRoutine ? "#" : '/select-routine' : '#'}>
                        <button className={`userpg-btn hm-btn ${hasOne ? hasOneAndTodaysRoutine ? "not-allowed" : "" : "not-allowed"}`}>{hasOne ? 'Select Exercise Routine' : 'Create Routine Below'}</button>
                    </Link>
                    <Link to='/create-new'>
                        <button className='userpg-btn hm-btn'>Create Exercise Routine</button>
                    </Link>
                    <Link to={hasOne ? '/progress' : "#"}>
                        <button className={`userpg-btn hm-btn ${hasOne ? "" : "not-allowed"}`}>View Progression</button>
                    </Link>
                    <Link to={hasOne ? '/manage'  : "#"}>
                        <button className={`userpg-btn hm-btn ${hasOne ? "" : "not-allowed"}`}>Manage Routines</button>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default User;