import React from 'react';
import { BsBarChartFill, BsFillCalendarCheckFill } from 'react-icons/bs';
import { Link } from 'react-router-dom';
import BackBtn from '../BackBtn';
import './Progress.css';

function Progress( { currentUser } ) {
    return(
        <div className='progress-container c-c'>
        <div className='progress flex'>
            <Link to='/progress-list'>
                <div className='progress-lg-btn-container flex'>
                    <div className='progress-img-container flex'>
                        <div className='progress-img r-c'>
                            <BsBarChartFill size={80}/>
                        </div>
                    </div>
                    <div className='progress-info c-c'>
                        <div className='view-progress-label'>
                            <h3>View History</h3>
                        </div>
                        <div className='view-progress-list'>
                        <ul>
                            <li>See all the routines and exercises done</li>
                            <li>View the progression of your exercises submitted</li>
                        </ul>

                        </div>
                    </div>
                </div>
            </Link>
            <Link to='/progress-calendar'>
                <div className='progress-lg-btn-container c-c'>
                    <div className='progress-img-container flex'>
                        <div className='progress-img r-c'>
                            <BsFillCalendarCheckFill size={80}/>
                        </div>
                    </div>
                    <div className='progress-info c-c'>
                    <div className='view-progress-label'>
                            <h3>View Calendar</h3>
                        </div>
                        <div className='view-progress-list'>
                        <ul>
                            <li>See the visual efforts of your consistency here</li>
                            <li>See which days you performed your routines</li>
                        </ul>

                        </div>
                    </div>
                </div>
            </Link>
        </div>
            <BackBtn currentUser={currentUser}/>
        </div>
    )
}

export default Progress;