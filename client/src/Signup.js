import React, { useState } from 'react';
import { useHistory } from 'react-router-dom'
import './Signup.css'

function Signup() {

    const history = useHistory()

    const [ error, setError ] = useState([])
    const [ toggleError, setToggleError ] = useState(false)
    const [ formData, setFormData ] = useState({
        username: "",
        password: "",
        reenterpassword: "",
        email: ""
    })

    function handleToggleError() {
        if (toggleError === true) {
            setToggleError(toggleError => !toggleError)
        }
    }

    function handleChange(e) {
        const { name, value } = e.target

        setFormData(acc => {
            return{
                ...acc, [name]:value
            }
        })
    }

    console.log(error)

    function handleSubmit(e) {
        e.preventDefault();
        if (formData.password !== formData.reenterpassword) {
            setError("Passwords don't match")
            setToggleError(toggleError => toggleError === true)
        } else {
        fetch('/users', {
            method: "POST",
            headers: {"Content-Type" : "application/json"},
            body: JSON.stringify({
                username: formData.username,
                password: formData.password,
                email: formData.email 
            })
        })
        .then(res => {
            if (res.ok) {
              history.push('/');
              // Continue with your success logic here
            } else {
              return res.json(); // Parse the response body as JSON
            }
          })
          .then(data => {
            if (data) {
              // Handle the errors received from the backend
              console.log(data.errors);
            }
          })
          .catch(error => {
            console.log(error);
          });
    }
}

    return(
        <div className="signup r-c">
            <form className='signup-box' onSubmit={handleSubmit}>
                <div className="signup-container r-c">
                    <div className='label r-c'>
                        <h3>Username:</h3>
                    </div>
                    <div className='field r-c'>
                        <input type='text' name='username' value={formData.username} onChange={handleChange} placeholder=''/>
                    </div>
                </div>
                <div className="signup-container r-c">
                    <div className='label r-c'>
                        <h3>Password:</h3>
                    </div>
                    <div className='field r-c'>
                        <input type='password' name='password' value={formData.password} onChange={handleChange} placeholder=''/>
                    </div>
                </div>
                <div className="signup-container r-c">
                    <div className='label c-c'>
                        <h3>Re-enter</h3>
                        <h3>Password:</h3>
                    </div>
                    <div className='field r-c'>
                        <input type='password' name='reenterpassword' value={formData.reenterpassword} onChange={handleChange} placeholder=''/>
                    </div>
                {error ? 
                <div className='error-field'>
                    <h6>{error}</h6>
                </div> : ""}
                </div>
                <div className="signup-container r-c">
                    <div className='label r-c'>
                        <h3>E-mail:</h3>
                    </div>
                    <div className='field r-c'>
                        <input type='text' name='email' value={formData.email} onChange={handleChange} placeholder=''/>
                    </div>
                </div>
                <div className='signup-btn-container r-c'>
                    <button className='btn'>Sign Up</button>
                </div>
            </form>
        </div>
    )
}

export default Signup;