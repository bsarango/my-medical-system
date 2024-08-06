import { useState, useEffect } from 'react'
import NavigationBar from './components/Navigationbar'
import {Outlet} from "react-router-dom"
import './App.css'

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
    <div className="bg-blue-200">
      <header className = ""> 
        <h1 className="center-text">One Medical Central</h1>
        <NavigationBar/>
        <button className="bg-transparent hover:bg-blue-900 text-green-700 font-semibold hover:text-white py-2 px-4 border border-blue-300 hover:border-transparent rounded" onClick={e=>{setLoggedIn(false)}}>LogOut</button>
      </header>
      <Outlet context={{loggedIn:[loggedIn,setLoggedIn]}}/>
    </div>
  )
}

export default App
