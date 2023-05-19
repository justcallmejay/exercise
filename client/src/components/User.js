import React from 'react';
import { useHistory } from 'react-router-dom';
import './User.css'

function User( { updateUser } ) {

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

    return(
        <div className="user c-c">
                <button onClick={handleLogout}>Logout</button>
            <div className='userpg-container c-c'>
                <button className='userpg-btn'>Select Exercise Routine</button>
                <button className='userpg-btn'>Create Exercise Routine</button>
            </div>
        </div>
    )
}

export default User;