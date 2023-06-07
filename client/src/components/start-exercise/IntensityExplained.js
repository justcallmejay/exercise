import React from 'react';

function IntensityExplained( { handleToggleDisplay } ) {
    return(
        <>
            <div className='intensity-info-container r-c'>
        <div className='intensity-info c-c'>
            <div className='intensity-img-container r-c'>
                <div className='intensity-img'>
                    <p>img</p>
                </div>
            </div>
            <div className='intensity-explanation-container r-c'>
                <div className='intensity-explanation'>
                <p>
                Intensity is based on the perceived difficulty by the individual (commonly known as rate of perceive exertion (RPE)) on a 1-10 scale.  
                Individuals active in fitness refers to 10 as being unable to perform another repetition (assuming each repeition is done properly), 9 being able to perform one more repetition, 8 being able to perfrom two, etc.
                The scale in this app is incremented by .5.  Use this fractional measurement as if you were unsure if more or less repetitions could've been performed.  To be safe, err on the cautious side; if you're uncertain you could've perform 1 or 2 more repetitions, then enter 8.5.
                </p>
                </div>
            </div>
            <div className='intensity-exit'>
                <button className='btn' onClick={handleToggleDisplay}>Ok</button>            
            </div>
        </div>
    </div>
        </>
    )
}

export default IntensityExplained;