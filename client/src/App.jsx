import { useState, useEffect } from 'react'
import NavigationBar from './components/Navigationbar'
import {Outlet} from "react-router-dom"
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const [loggedIn, setLoggedIn] = useState(false)
    
  useEffect(()=>{  
    fetch("/api/check_session")
    .then(r =>{
      if (r.ok){
        r.json().then(patient=>{
          setLoggedIn(true)
        });
        };
      });
  },[]);

  return (
    <div>
      <header className = ""> 
        {/* <h1 className="center-text">One Medical Central</h1> */}
        <NavigationBar/>
        <button className="" onClick={e=>{setLoggedIn(false)}}>LogOut</button>
      </header>
      <Outlet context={{loggedIn:[loggedIn,setLoggedIn]}}/>
    </div>
  )
}

export default App
