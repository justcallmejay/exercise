import React, { useState } from 'react';
import { useHistory } from 'react-router-dom'
import './Signup.css'

function Signup( { handleNewAccount, setLoading } ) {

    const history = useHistory()

    const [ error, setError ] = useState([])
    const [ pwError, setPwError ] = useState('')
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

    // function handleToggleError() {
    //     if (toggleError === true) {
    //         setToggleError(toggleError => !toggleError)
    //     }
    // }

    function handleChange(e) {
        const { name, value } = e.target

        setFormData(acc => {
            return{
                ...acc, [name]:value
            }
        })
    }

    console.log(typeof(formData.weight))
    console.log(typeof(formData.feet))


    console.log(error)

    function handleSubmit(e) {
        setLoading(true)
        e.preventDefault();
        if (formData.password !== formData.reenterpassword) {
            setPwError("Passwords don't match")
            // setToggleError(toggleError => toggleError === true)
        } else {
        fetch('/users', {
            method: "POST",
            headers: {"Content-Type" : "application/json"},
            body: JSON.stringify({
                name: formData.name,
                username: formData.username,
                password: formData.password,
                email: formData.email,
                feet: formData.feet,
                inches: formData.inches
            })
        })
        .then(res => {
            if (res.ok) {
                res.json()
                .then((res) => {
                    handleNewAccount(res);
                    fetch(`/weights`, {
                        method: "POST",
                        headers: {"Content-Type" : "application/json"},
                        body: JSON.stringify({
                            weight: formData.weight,
                            user_id: res.id
                        })
                    })
                    .then(res => {
                        if (res.ok) {
                            setLoading(false)
                            res.json().then(console.log(res))
                        }
                    })
                    .then((data) => {
                        if (data) {
                            console.log(data.errors)
                        }
                    })
                    .catch(error => {
                        console.log(error)
                    })
                })
            }
        })
        
        //     setLoading(false)
            //     console.log(res)
            // } else {
            //     return res.json()
            // }      
            // .then((res) => {
                //     console.log(res)
            // })
            // .then(res => {
                    //     if (res.ok) {
                        //         setLoading(false)
                        //         history.push('/');
                        //         return res.json();
                        //     }
                        // })
                        // .then(data => {
                            //     if (data) {
                                //         setLoading(false)
                    //         setError(data.errors)
                    //     }
                    // })
                    // .catch(error => {
                        // setLoading(false)
                    //     console.log(error)
                    // })
        //         })
          .then(data => {
            if (data) {
                setLoading(false)
              setError(data.errors);
            }
          })
          .catch(error => {
                setLoading(false)
                console.log(error);
              });
            // }
        }
    }
        
    return(
        <div className="signup r-c">
            <form className='signup-box c-c' onSubmit={handleSubmit}>
            <div className="signup-field-container c-c">
                    <div className='signup-field flex'>
                        <div className='label flex'>
                            <h3>Name:</h3>
                        </div>
                        <div className='field flex'>
                            <input type='text' name='name' value={formData.name} onChange={handleChange} placeholder=''/>
                        </div>
                    </div>
                    {error ? 
                    <div className='error-container'>
                        <h6>{error.name}</h6>
                    </div> : ""}
                </div>
                <div className="signup-field-container c-c">
                    <div className='signup-field flex'>
                        <div className='label flex'>
                            <h3>Username:</h3>
                        </div>
                        <div className='field flex'>
                            <input type='text' name='username' value={formData.username} onChange={handleChange} placeholder=''/>
                        </div>
                    </div>
                    {error  ?
                    <div className='error-container'>
                        <h6>{error.username}</h6>
                    </div> : "" }
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
                    {error  ?
                    <div className='error-container'>
                        <h6>{error.password}</h6>
                    </div> : "" }
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
                    {pwError != "" ?
                    <div className='error-container'>
                        <h6>{pwError}</h6>
                    </div>
                 : ""}
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
                    {error  ?
                    <div className='error-container'>
                        <h6>{error.email}</h6>
                    </div> : "" }
                </div>
                <div className="signup-field-container c-c">
                    <div className='signup-field flex'>
                        <div className='label-number r-c'>
                            <h3>Weight:</h3>
                        </div>
                        <div className='field-number r-c'>
                            <input type='number' name='weight' min='3' max='700' step='0.1' value={formData.weight} onChange={handleChange} />
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
                    {error ? 
                    <div className='error-container r-c'>
                        <h6>{error.weight}</h6>
                        <h6>{error.height}</h6>
                        <h6>{error.feet}</h6>
                        <h6>{error.inches}</h6>
                    </div>: ""}
                </div>
                <div className='signup-btn-container r-c'>
                    <button className='btn'>Sign Up</button>
                </div>
            </form>
        </div>
    )
}

export default Signup;