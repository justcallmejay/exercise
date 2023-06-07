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
import ManageRoutine from './components/manage/ManageRoutine'
import './ClipLoader.css'

function App() {

  const date = (new Date())
  const options = { timeZone: 'UTC', month: 'short', day: 'numeric', year: 'numeric' };
  const formattedDate = date.toLocaleDateString('en-US', options);

  const [ user, setUser ] = useState([])
  const [ currentUser, setCurrentUser ] = useState(false)
  const [ userRoutine, setUserRoutine ] = useState([])
  const [ loading, setLoading ] = useState(false)
  const [ todaysRoutine, setTodaysRoutine ] = useState([])

  console.log(currentUser)

  function handleNewAccount(acc) {
    setUser([...user, acc])
  }

  function updateUser(user) {
    setCurrentUser(user)
  }

  useEffect(() => {
      fetch(`/last_routine/?date=${formattedDate}`)
      .then(res => res.json())
      .then(res => setTodaysRoutine(res))
  }, [])

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

  // console.log(todaysRoutine)

  return (
    <div className="App r-c">
      {loading ?
      <div className='clip-loader r-c'>
       <div className='clip-loader-container c-c'>
        <ClipLoader
        // css={override}
        size={150}
        loading={loading}
        />
        <p>Loading...</p>
        </div> 
      </div>
      : ""
      }
    {currentUser ?
      <BrowserRouter>
        <Switch>
          <Route path='/start-exercise'>
            <StartExercise 
              currentUser={currentUser} 
              todaysRoutine={todaysRoutine} 
              formattedDate={formattedDate}
              setLoading={setLoading}
            />
          </Route>
          <Route path={`/users/${currentUser.username}`}>
            <User
              setLoading={setLoading}
              currentUser={currentUser} 
              formattedDate={formattedDate}
              setTodaysRoutine={setTodaysRoutine} 
              setUserRoutine={setUserRoutine} 
              updateUser={updateUser} 
              userRoutine={userRoutine}
              todaysRoutine={todaysRoutine}
              date={date}
                />
          </Route>
          <Route path='/select-routine'>
            <SelectRoutine 
              currentUser={currentUser} 
              setLoading={setLoading}
              todaysRoutine={todaysRoutine} 
              userRoutine={userRoutine} 
                />
          </Route>
          <Route path='/create-new'>
            <Routine 
              currentUser={currentUser} 
              setLoading={setLoading}
                />
          </Route>
          <Route path='/progress'>
            <Progress 
              currentUser={currentUser}
                />
          </Route>
          <Route path='/progress-list'>
            <ProgList 
              currentUser={currentUser}
                />
          </Route>
          <Route path='/progress-calendar'>
            <ProgCalendar 
              currentUser={currentUser} 
              setLoading={setLoading}
                />
          </Route>
          <Route path='/manage'>
            <ManageRoutine 
              currentUser={currentUser}
                />
          </Route>
        </Switch>
      </BrowserRouter>
            :
      <BrowserRouter>
      <Switch>
        <Route path='/signup'>
          <Signup handleNewAccount={handleNewAccount} setLoading={setLoading}/>
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
