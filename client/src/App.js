import React, { useEffect, useState } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import Home from './Home'
import Signup from './Signup'
import Login from './Login'
import User from './components/User'
import Routine from './components/routine/Routine'
import SelectRoutine from './components/select-routine/SelectRoutine';
import StartExercise from './components/start-exercise/StartExercise';
import Progress from './components/progression/Progress';
import ProgCalendar from './components/progression/ProgCalendar';
import ProgList from './components/progression/ProgList';
import ClipLoader from "react-spinners/ClipLoader";
import ManageRoutine from './components/ManageRoutine'
import './ClipLoader.css'

function App() {

  const [ user, setUser ] = useState(null)
  const [ currentUser, setCurrentUser ] = useState(false)
  const [ userRoutine, setUserRoutine ] = useState([])
  const [ startExercise, setStartExercise ] = useState([])
  const [ loading, setLoading ] = useState(false)

  function handleNewAccount(acc) {
    setUser([...user, acc])
  }

  function updateUser(user) {
    setCurrentUser(user)
  }

  // useEffect(() => {
  //   if (loading) {
  //     setTimeout(() => {
  //       setLoading(false)
  //     }, 5000)
  //   }
  // }, [loading])

  useEffect(() => {
    fetch('/authorized')
    .then(res => {
      if (res.ok) {
        res.json()
        .then((user) => {
          setCurrentUser(user);
        })
      }
    })
  }, [])

  // console.log(currentUser.id)

  return (
    <div className="App">
      {loading ?
      <div className='clip-loader r-c'>
       <div className='clip-loader-container r-c'>
        <ClipLoader
        // css={override}
        size={150}
        loading={loading}
        />
        </div> 
      </div>
      : ""
      }
    {currentUser ?
      <BrowserRouter>
        <Switch>
          <Route path='/start-exercise'>
            <StartExercise currentUser={currentUser} startExercise={startExercise}/>
          </Route>
          <Route path={`/users/${currentUser.username}`}>
            <User currentUser={currentUser} updateUser={updateUser} userRoutine={userRoutine} setUserRoutine={setUserRoutine}/>
          </Route>
          <Route path='/select-routine'>
            <SelectRoutine userRoutine={userRoutine} currentUser={currentUser} setStartExercise={setStartExercise} setLoading={setLoading}/>
          </Route>
          <Route path='/create-new'>
            <Routine currentUser={currentUser} setLoading={setLoading}/>
          </Route>
          <Route path='/progress'>
            <Progress />
          </Route>
          <Route path='/progress-list'>
            <ProgList/>
          </Route>
          <Route path='/progress-calendar'>
            <ProgCalendar/>
          </Route>
          <Route path='/manage'>
            <ManageRoutine currentUser={currentUser}/>
          </Route>
        </Switch>
      </BrowserRouter>
            :
      <BrowserRouter>
      <Switch>
        <Route path='/signup'>
          <Signup handleNewAccount={handleNewAccount}/>
        </Route>
        <Route path='/login'>
          <Login updateUser={updateUser} currentUser={currentUser} setLoading={setLoading}/>
        </Route>
        <Route path='/'>
          <Home/>
        </Route>
      </Switch>
      </BrowserRouter>

      }
    </div>
  );
}

export default App;
