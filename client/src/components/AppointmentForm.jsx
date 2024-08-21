import React,{useState} from 'react'

function AppointmentForm(){

    return (
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

export default AppointmentForm