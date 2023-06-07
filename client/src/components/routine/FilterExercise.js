import React from 'react';
import './FilterExercise.css'

function FilterExercise( { setFilterDifficulty, searchInput, setSearchInput } ) {

    function handleDifficultChange(e) {
        setFilterDifficulty(e)
    }

    function handleSearchInput(e) {
        setSearchInput(e)
    }

    return(
        <>
        <div className='filter-exercise-container r-c'>
            <div className='filter-label r-c'>
                <h6>Filter Difficulty:</h6>
            </div>
            <div className='filter-dropdown flex'>
                <select onChange={(e) => handleDifficultChange(e.target.value)}>
                    <option value="All">All</option>
                    <option value="Easy">Easy</option>
                    <option value="Moderate">Moderate</option>
                    <option value="Difficult">Difficult</option>
                </select>
            </div>
        </div>
        <div className='search-exercise-container r-c'>
            <div className='search-exercise-label flex'>
                Search Exercise:
            </div>
            <div className='search-exercise-field r-c'>
                <input type='text' placeholder='Exercise' value={searchInput} onChange={(e) => handleSearchInput(e.target.value)}/>
            </div>
        </div>
        </>
    )
}

export default FilterExercise;