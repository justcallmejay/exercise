import React from 'react';
import './home.css'

function Home() {
    return(
        <div className='home flex'>
            <div className="home-enter-page-container c-c">
                <div className="home-enter-page-oversize c-c">
                    <div className='home-enter c-c'>
                        {/* <div className='home-enter-signup-box'>
                            
                        </div> */}
                        <div className='home-enter-page-box c-c'>
                            <h3>Welcome</h3>
                            <button className='btn'>Login</button>
                            <button className='btn'>Sign Up</button>
                        </div>
                        <div className='home-enter-login-box'>

                        </div>

                    </div>

                </div>
            </div>
            <div className="home-welcome-container c-c">
                <div className='home-welcome-label c-c'>
                    <h1>QuickFit</h1>
                    <p>Starting an exercise quickly</p>
                </div>
            </div>
        </div>
    )
}

export default Home;
