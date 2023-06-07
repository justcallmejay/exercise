import React, { useEffect, useState } from 'react';
import moment from 'moment'
import './ProgCalendar.css';
import { BsCheck2 } from 'react-icons/bs'
import { HiXMark } from 'react-icons/hi2'
import { getSortedDay, prevMonth, nextMonth, days, getMonthYear, areDatesTheSame } from './Range'

function ProgCalendar( { currentUser } ) {
    
    const options = { timeZone: 'UTC', month: 'short', day: 'numeric', year: 'numeric' };

    const date = new Date()
    const dateConvert = date.toLocaleDateString('en-Us', options)
    const intDate = moment(dateConvert).format('YYYY, MM, DD')
    const dateWithoutCommas = intDate.replace(/[,\s]/g, '');
    const getyearInt = parseInt(dateWithoutCommas.slice(0, 4))
    const getMonthInt = parseInt(dateWithoutCommas.slice(4, 6))
    const getDayInt = parseInt(dateWithoutCommas.slice(6, 8))

    console.log(date)

    const [ displayRoutineRx, setDisplayRoutineRx ] = useState(null)
    const [ toggleDisplay, setToggleDisplay ] = useState(false)
    const [ userRoutines, setUserRoutines ] = useState([])
    const [ currentDate, setCurrentDate ] = useState(new Date(getyearInt, getMonthInt - 1, getDayInt))

    console.log(currentDate)

    useEffect(() => {
        fetch(`/find_completed_routine/?user_id=${currentUser.id}`)
        .then(res => res.json())
        .then(res => setUserRoutines(res))
    }, [currentUser.id])

    const formattedArray = userRoutines.map((ev) => {
    
        const formattedDate = new Date(ev.date).toLocaleDateString('en-US', options)
        const intDate = moment(formattedDate).format('YYYY, MM, DD')
        const dateWithoutCommas = intDate.replace(/[,\s]/g, '');
        const getyearInt = parseInt(dateWithoutCommas.slice(0, 4))
        const getMonthInt = parseInt(dateWithoutCommas.slice(4, 6))
        const getDayInt = parseInt(dateWithoutCommas.slice(6, 8))

        return { date: new Date(getyearInt, getMonthInt - 1, getDayInt), title: ev.name, id: ev.id, completed: ev.completed };
    })

    console.log(formattedArray)

    function displayRoutine(id, name, date) {

        const getDate = new Date(date).toLocaleDateString('en-US', options)

        //find routine based on date; this will get all the exerciserx of that date
        fetch(`/get_routine_by_date/?user_id=${id}&name=${name}&date=${getDate}`)
        .then(res => {
            if (res.ok)
            setToggleDisplay(toggleDisplay => !toggleDisplay)
            return res.json()
        })
        .then(res => setDisplayRoutineRx([{name: name, date: getDate}, res]))
}

    console.log(displayRoutineRx)

    return(
     <>
        {toggleDisplay ? 
        <div className='display-cal-rout r-c' onClick={displayRoutine}>
            <div className='display-cal-container'>
                {displayRoutineRx ? 
                    displayRoutineRx.map (rout => 
                <>
                <div className='display-rout-name r-c'>
                    <h3>{rout.name}</h3><p>{rout.date}</p>
                </div>
                {Array.isArray(rout) &&
                rout?.map(ro =>
                <div className='display-rout-ex'>
                    <h4>Exercise: {ro?.exercise_routine.workout.name}</h4>
                    <div className='display-rout-sets flex'>
                        <p>Weight: {ro?.weight}</p>
                        <p>Sets: {ro?.exercise_routine.sets}</p>
                        <p>Reps: {ro?.exercise_routine.reps}</p>
                        <p>{ro.completed ? <BsCheck2 /> : <HiXMark/>}</p>
                    </div>
                </div> )} 
                </>)
                : ""}
            </div>
        </div>      
            : ""}

        <div className='prog-calendar c-c' >
            <div className='calendar-head flex'>
                <button className='calendar-btn r-c' onClick={() => prevMonth(currentDate, setCurrentDate)}>
                    Back
                </button>
                <div className='calendar-date r-c'>
                    <p>{getMonthYear(currentDate)}</p>
                </div>
                    <button className='calendar-btn r-c' onClick={() => nextMonth(currentDate, setCurrentDate)}>
                    Forward
                </button>
            </div>
            <div className='calendar-days r-c'>
                {days.map(day =>
                    <div className='days-container'>{day}
                </div>
                )}
            </div>
            <div className='calendar-body'>
                {getSortedDay(currentDate).map(day => 
                <span className='day-box'>{day}
                  {formattedArray.map(newObject =>
                        areDatesTheSame(new Date(currentDate.getFullYear(), currentDate.getMonth(), day), newObject.date) && 
                        <div className={`styled-events r-c ${newObject.completed ? "completed-calc" : ""}`} key={newObject.id} onClick={() => displayRoutine(currentUser.id, newObject.title, newObject.date)}>
                            {newObject.title}
                        </div>
                        )}
                </span>
                    )}
            </div>
        </div>
    </>
    )
}

export default ProgCalendar;