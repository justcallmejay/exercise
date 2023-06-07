import React from 'react';
import { Link } from 'react-router-dom'

function BackBtn( { currentUser }) {
    return(
        <div className='back-btn-container flex'>
        <Link to={`/users/${currentUser.username}`}>
            <p>{`<< Back`}</p>
        </Link>
    </div>
    )
}

export default BackBtn;