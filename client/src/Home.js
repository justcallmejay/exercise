import React from 'react';
import { Link } from 'react-router-dom'
import { TfiWrite } from 'react-icons/tfi'
import { BiRun } from 'react-icons/bi'
import { CgTrack } from 'react-icons/cg'
import './home.css'

function Home() {
    return(
        <div className='home c-c'>
            <div className='home-container r-c'>

                <div className="home-enter-page-container c-c">
                    <div className='home-enter-page-box c-c'>
                        <h3>Welcome</h3>
                        <Link to='/signup'>
                            <button className='btn'>Sign Up</button>
                        </Link>
                        <Link to='/login'>
                            <button className='btn'>Login</button>
                        </Link>
                    </div>
                </div>

                <div className="home-welcome-container c-c">
                    <div className='home-welcome-label c-c'>
                        <div className='home-title-label wd'>
                            <h1>Some Exercise App</h1>
                        </div>
                        <div className='home-desc'>
                            <p>Working out. Simplified.</p>
                        </div>
                        <div className='home-welcome-image wd flex'>
                            <div className='home-img-desc c-c'>
                                <div className='home-icon wd r-c'>
                                    <TfiWrite size={100}/>
                                </div>
                                <p>Make Your Exercise Routines</p>
                            </div>
                            <div className='home-img-desc c-c'>
                                <div className='home-icon wd r-c'>
                                    <BiRun size={100}/>
                                </div>
                                    <p>Exercise</p>
                            </div>
                            <div className='home-img-desc c-c'>
                                <div className='home-icon wd r-c'>
                                    <CgTrack size={100}/>
                                </div>
                                <p>Track Your Progress</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

                <div className='home-footer flex wd'>
                    <div className='home-links flex ht'>
                        <ul className='home-ul flex wd'>
                            <li>Site</li>
                            <li>Contact</li>
                            <li>About Us</li>
                        </ul>
                    </div>
                </div>
        </div>
    )
}

export default Home;
