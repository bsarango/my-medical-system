import React,{useState, useEffect} from 'react'
import {Link, useOutletContext} from "react-router-dom"
import Appointment from "../components/Appointment"

function AppointmentPage(){

    const [appointments, setAppointments] = useState([])
    const [displayAppointmentForm, setDisplayAppointmentForm] = useState(true)
    const [formTitle, setFormTitle] = useState("")

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

    function makeAppointment(){
        return "Make Appointment"
    }
    
    if(displayAppointmentForm){
        return(
        <form onSubmit={makeAppointment}>
            <div>
                <label>Enter Appointment Title</label>
                <input
                    className=""
                    type="text"
                    name="title"
                    value={formTitle}
                    onChange={(e)=>{setFormTitle(e.target.value)}}
                >
                </input>
            </div>
            <div>
                <label>Enter Appointment Title</label>
                {/* Put a calender for enter date and time */}
            </div>
            <button type="submit">Make New Appointment</button>
        </form>
        )
    }
    
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
            <Button onClick={()=>{setDisplayAppointmentForm(!displayAppointmentForm)}}>New Appointment</Button>
            {}
            <h2>Here are your current appointments. Please review prior to seeing your patients</h2>
            {displayAppointments}
        </div>
    )
}

export default AppointmentPage