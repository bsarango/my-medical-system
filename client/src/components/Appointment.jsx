import React from 'react'

function Appointment({appointment}){
    return(
        <div>
            <h2>{appointment.title}</h2>
            <br></br>
            <h3>{appointment.date}</h3>
            <br></br>
            <h3>{appointment.time}</h3>
            <br></br>
            <p>{appointment.details}</p>
        </div>
    )
}

export default Appointment