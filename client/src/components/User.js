import React, { useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import './User.css'

function User( { updateUser, userRoutine, setUserRoutine, currentUser } ) {

    const history = useHistory()

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
        fetch(`/routines/?user_id=${currentUser.id}`)
        .then(res => res.json())
        .then(res => setUserRoutine(res))
        }
      }, [])


    const hasOne = userRoutine.length > 0 ? true : false

    console.log(currentUser)
    console.log(userRoutine)
    console.log(hasOne)
    return(
        <div className="user c-c">
                <button onClick={handleLogout}>Logout</button>
            <div className='userpg-container c-c'>
                <Link to='/start-exercise'>
                    <button className='userpg-btn hm-btn'>Start Exercise</button>
                </Link>
                <Link to='/select-routine'>
                    <button className={`userpg-btn ${hasOne ? "" : "not-allowed"}`}>{hasOne ? 'Select Exercise Routine' : 'Start Below'}</button>
                </Link>
                <Link to='/create-new'>
                    <button className='userpg-btn hm-btn'>Create Exercise Routine</button>
                </Link>
                <Link to='/progress'>
                    <button className='userpg-btn hm-btn'>View Progression</button>
                </Link>
            </div>
        </div>
    )
}

export default User;