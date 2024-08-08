import React,{useState, useEffect} from 'react'
import {Link, useOutletContext} from "react-router-dom"
import Appointment from "../components/Appointment"
import Button from "react-bootstrap/Button"

function AppointmentPage(){

    const [appointments, setAppointments] = useState([])

    const{loggedIn}= useOutletContext()

    useEffect(()=>{
        fetch("/api/appointments")
      .then(r =>{
        if (r.ok){
          r.json().then(appointments=>{
            setAppointments(appointments)
        });
        };
      });
    },[]);
    
    const displayAppointments = appointments.map(appointment=>{
        return <Appointment appointment={appointment}/>
    })

    if(!loggedIn){
        return(
            <div>
                <p>You must be logged in view appointments and patients</p>
                <Link to = "/login">
                    <button className="bg-transparent hover:bg-blue-900 text-green-700 font-semibold hover:text-white py-2 px-4 border border-blue-300 hover:border-transparent rounded">Login</button>
                </Link>
            </div>
        )
    }

    return(
        <div>
            <Button>New Appointment</Button>
            <h2>Here are your current appointments. Please review prior to seeing your patients</h2>
            {displayAppointments}
        </div>
    )
}

export default AppointmentPage