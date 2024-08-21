import React,{useState, useEffect} from 'react'
import {Link, useOutletContext} from "react-router-dom"
import Appointment from "../components/Appointment"

function AppointmentPage(){
    const [patients, setPatients] = useState([])
    const [appointments, setAppointments] = useState([])
    const [displayAppointmentForm, setDisplayAppointmentForm] = useState(false)

    const [formTitle, setFormTitle] = useState("")
    const [selectedPatient, setSelectedPatient] = useState(null)
    const [date, setDate] = useState("")
    const [time, setTime] = useState("")

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

    useEffect(()=>{
        fetch("/api/patients")
        .then(r =>{
          if (r.ok){
            r.json().then(patients=>{
              setPatients(patients)
          });
          };
        });
      },[]);

    const patientOptions = patients.map(patient=>{
        return(
            <option
                key={patient.id}
                value = {patient.id}
            >
                {patient.first_name} {patient.last_name}
            </option>
        )
    })

    function makeAppointment(e){
        e.preventDefault()
        
        const formValues = {
            title: formTitle,
            selectedPatient : selectedPatient,

        }
    }
    
    if(displayAppointmentForm){
        return(
        <form onSubmit={makeAppointment}>
            <div>
                <label>Enter the Reason for the Appointment</label>
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
                <label>Enter a Date</label>
                {/* Put a calender for enter date and time */}
            </div>
            <div className='p-2'>
                    <label>Select Patient for the Appointment</label>
                    <select onChange={e=>{setSelectedPatient(e.target.value)}}>
                    {patientOptions}
                    </select>
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
            <button onClick={()=>{setDisplayAppointmentForm(!displayAppointmentForm)}}>New Appointment</button>
            {}
            <h2>Here are your current appointments. Please review prior to seeing your patients</h2>
            {displayAppointments}
        </div>
    )
}

export default AppointmentPage