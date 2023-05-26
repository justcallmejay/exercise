import React, { useState } from 'react';
import { useHistory } from 'react-router-dom'
import './Signup.css'

function Signup( { handleNewAccount } ) {

    const history = useHistory()

    const [ error, setError ] = useState([])
    const [ toggleError, setToggleError ] = useState(false)
    const [ formData, setFormData ] = useState({
        username: "",
        password: "",
        reenterpassword: "",
        email: "",
        weight: "",
        feet: "",
        inches: ""
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
                email: formData.email,
                weight: formData.weight,
                feet: formData.feet,
                inches: formData.inches
            })
        })
        .then(res => {
            if (res.ok) {
              history.push('/');
              handleNewAccount(res);
            } else {
              return res.json();
            }
          })
          .then(data => {
            if (data) {
              setError(data.errors);
            }
          })
          .catch(error => {
            console.log(error);
          });
    }
}

    return(
        <div className="signup r-c">
            <form className='signup-box c-c' onSubmit={handleSubmit}>
                <div className="signup-field-container c-c">
                    <div className='signup-field flex'>
                        <div className='label flex'>
                            <h3>Username:</h3>
                        </div>
                        <div className='field flex'>
                            <input type='text' name='username' value={formData.username} onChange={handleChange} placeholder=''/>
                        </div>
                    </div>
                    <div className='error-container'>
                    <h6>{error.username}</h6>

                        </div>
                </div>
                <div className="signup-field-container c-c">
                    <div className='signup-field flex'>
                        <div className='label flex'>
                            <h3>Password:</h3>
                        </div>
                        <div className='field flex'>
                            <input type='password' name='password' value={formData.password} onChange={handleChange} placeholder=''/>
                        </div>
                    </div>
                    <div className='error-container'>
                        <h6>{error.password}</h6>
                    </div>
                </div>
                <div className="signup-field-container c-c">
                    <div className='signup-field flex'>
                        <div className='label-a flex'>
                            <h3>Re-enter</h3>
                            <h3>Password:</h3>
                        </div>
                        <div className='field flex'>
                            <input type='password' name='reenterpassword' value={formData.reenterpassword} onChange={handleChange} placeholder=''/>
                        </div>
                    </div>
                    <div className='error-container'>
                        <h6>{error}</h6>
                    </div>
                </div>
                <div className="signup-field-container c-c">
                    <div className='signup-field flex'>
                        <div className='label flex'>
                            <h3>E-mail:</h3>
                        </div>
                        <div className='field flex'>
                            <input type='text' name='email' value={formData.email} onChange={handleChange} placeholder=''/>
                        </div>
                    </div>
                    <div className='error-container'>
                        <h6>{error.email}</h6>
                    </div>
                </div>
                <div className="signup-field-container c-c">
                    <div className='signup-field flex'>
                        <div className='label-number r-c'>
                            <h3>Weight:</h3>
                        </div>
                        <div className='field-number r-c'>
                            <input type='number' name='weight' min='3' max='700' value={formData.weight} onChange={handleChange} />
                            <h3>lbs:</h3>
                        </div>
                        <div className='label-number r-c'>
                            <h3>Height:</h3>
                        </div>
                        <div className='field-number r-c'>
                            <input type='number' name='feet' min='1' max='8' value={formData.feet} onChange={handleChange} />
                            <h3>Ft:</h3>
                        </div>
                        <div className='field-number r-c'>
                            <input type='number' name='inches' min='0' max='11' value={formData.inches} onChange={handleChange} />
                            <h3>In:</h3>
                        </div>
                    </div>
                    <div className='error-container r-c'>
                        <h6>{error.height}</h6>
                        <h6>{error.feet}</h6>
                        <h6>{error.inches}</h6>
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