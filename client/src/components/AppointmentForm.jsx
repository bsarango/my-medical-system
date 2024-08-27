import React,{useState} from 'react'
import TimeSelectField from './TimeSelectField'

function AppointmentForm({setDisplayAppointmentForm, patients, addNewAppointment}){

    const [formTitle, setFormTitle] = useState("")
    const [selectedPatient, setSelectedPatient] = useState(null)
    const [date, setDate] = useState("")
    const [time, setTime] = useState("")

    function makeAppointment(e){
        e.preventDefault()
        
        const formValues = {
            title: formTitle,
            selectedPatient : selectedPatient,
            date : date,
            time: time
        }

        fetch("/api/appointments",
            {
                method: "POST",
                headers: {
                    "Content-type": "application/json",
                },
                body: JSON.stringify(formValues),
            })
            .then(r=>{
                if(r.ok){
                    r.json().then(newAppointment=>addNewAppointment(newAppointment))
                }
            })
    }

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
            <div>
                <label>Select the Time</label>
                <TimeSelectField/>
            </div>
            <div className='p-2'>
                    <label>Select Patient for the Appointment</label>
                    <select onChange={e=>{setSelectedPatient(e.target.value)}}>
                        {patients}
                    </select>
                </div>
            <button onClick={setDisplayAppointmentForm(false)}>Cancel</button>
            <button type="submit">Make New Appointment</button>
        </form>
    )

}

export default AppointmentForm