import React, { useState } from 'react';
import './ProgCalendar.css';
import { Range, getDaysInMonth, getSortedDays, areDatesTheSame, getDateObj, mockEvents } from './Range'

function ProgCalendar() {

    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']

    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']

    const date = new Date();

    const [startingMonth, setStartingMonth] = useState(date.getMonth())
    
    // const [startingDay, setStartingDay] = useState(date.getMonth())

    const [startingYear, setStartingYear] = useState(date.getFullYear())

    const daysInAMonth = getDaysInMonth(startingMonth, startingYear)

    function nextMonth() {
        if (startingMonth < 11) {
            setStartingMonth(prev => prev + 1);
        } else {
            setStartingMonth(0)
            setStartingYear(prev => prev + 1)
        }
    };

    function prevMonth() {
        if (startingMonth > 0) {
            setStartingMonth(prev => prev - 1)
        } else {
            setStartingMonth(11)
            setStartingYear(prev => prev - 1)
        }
    }


    return(
        <div className='prog-calendar'>
            <div className='calendar-head flex'>
                <div className='calendar-btn r-c' onClick={prevMonth}>
                    <p>Back</p>
                </div>
                <div className='calendar-date r-c'>
                    <p>{months[startingMonth]} {startingYear}</p>
                </div>
                <div className='calendar-btn r-c' onClick={nextMonth}>
                    <p>Forward</p>
                </div>
            </div>
            <div className='calendar-days r-c'>
                {getSortedDays(startingMonth, startingYear).map(day => 
                <div className='days-container'>
                    <p active={areDatesTheSame(new Date(), getDateObj(day, startingMonth, startingYear))}>{day}</p>
                </div>)}
            </div>
            <div className='calendar-body'>
                {Range(daysInAMonth).map(day => 
                <span className='day-box'>{day}
                {mockEvents.map(ev => 
                    areDatesTheSame(getDateObj(day, startingMonth, startingYear), ev.date) && 
                    <div className='styled-events'>
                    {ev.title}
                    </div>
                    )}
                </span>
                    )}
            </div>
        </div>
    )
}

export default ProgCalendar;