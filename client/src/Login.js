import React, { useState } from 'react';
import { useHistory } from 'react-router-dom'
import './Login.css'
import { Link } from 'react-router-dom'

function Login( { updateUser, currentUser } ) {

    console.log(currentUser)

    const history = useHistory()

    const [ error, setError ] = useState([])
    const [ formData, setFormData ] = useState({
        username: "",
        password: ""
    })

    function handleChange(e) {
        const { name, value } = e.target;
        
        setFormData(acc => {
            return{
                ...acc, [name]:value 
            }
        })
    }

    function handleSubmit(e) {
        e.preventDefault();
        if (formData.username === "" || formData.password === "") {
            console.log('Enter text field')
        } else {
            fetch('/login', {
                method: "POST",
                headers: {"Content-Type" : "application/json"},
                body: JSON.stringify({
                    username: formData.username,
                    password: formData.password
                })
            })
            .then(res => {
                if (res.ok) {
                    res.json().then(user => {
                    updateUser(user)
                    history.push(`/users/${user.username}`)
                })
                }
            })
        }
    }


    return(
        <div className='login r-c'>
            <form className='login-container' onSubmit={handleSubmit}>
                <div className='login-label-box flex'>
                    <h2>Login:</h2>
                </div>
                <div className='user-container r-c'>
                    <div className='login-label r-c'>
                        <h3>Username:</h3>
                    </div>
                    <div className='login-input r-c'>
                        <input type='text' name="username" value={formData.username} onChange={handleChange} placeholder="Username" />
                    </div>
                </div>
                <div className='user-container r-c'>
                    <div className='login-label r-c'>
                        <h3>Password:</h3>
                    </div>
                    <div className='login-input r-c'>
                        <input type='password' name="password" value={formData.password} onChange={handleChange}placeholder="Password" />
                    </div>
                </div>
                <div className='login-btn-container flex'>
                    <button className='btn'>Login</button>
                </div>
                <div className='login-btn-container flex'>
                    <Link to='/signup'>
                        <p>Don't have an account? Click here</p>
                    </Link>
                </div>
            </form>
                
        </div>
    )
}

export default Login;