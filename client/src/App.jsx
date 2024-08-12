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

  function handleLogout(e){
    fetch("/api/logout",
    {
      method:"DELETE"
    })
    .then(r=>r.json())
    .then((message)=>{console.log(message),setLoggedIn(false)})
  }

  return (
    <div>
      <header className = ""> 
        <NavigationBar className=""/>
        <button className="" onClick={e=>{handleLogout}}>LogOut</button>
      </header>
      <Outlet context={{loggedIn:[loggedIn,setLoggedIn]}}/>
    </div>
  )
}

export default App
