import React,{useState} from 'react'
import TimeSelectField from './TimeSelectField'
import DateSelectField from './DateSelectField'

function AppointmentForm({setDisplayAppointmentForm, patients, addNewAppointment}){

    const [formTitle, setFormTitle] = useState("")
    const [selectedPatient, setSelectedPatient] = useState(null)
    const [date, setDate] = useState("")
    const [time, setTime] = useState("")
    const [details, setDetails] = useState("")

    function makeAppointment(e){
        e.preventDefault()
        
        const formValues = {
            title: formTitle,
            selectedPatient : selectedPatient,
            date : date,
            time: time,
            details: details
        }
        console.log(formValues)
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
                    r.json().then(newAppointment=>{addNewAppointment(newAppointment),setDisplayAppointmentForm(false)})
                }
            })
    }

    return (
        <div className='p-4'>
            <form onSubmit={makeAppointment}>
                <div className=''>
                    <label>Enter the Reason for the Appointment</label>
                    <input
                        className="form-control"
                        type="text"
                        name="title"
                        value={formTitle}
                        onChange={(e)=>{setFormTitle(e.target.value)}}
                    >
                    </input>
                </div>

                <div className="p-2">
                    <label>Enter a Date</label>
                    <DateSelectField setDate={setDate}/>
                </div>

                <div className='p-2'>
                    <label>Select the Time</label>
                    <TimeSelectField setTime={setTime}/>
                </div>

                <div className='p-2'>
                    <label>Select Patient for the Appointment</label>
                    <select onChange={e=>{setSelectedPatient(e.target.value)}}>
                        {patients}
                    </select>
                </div>

                <div className='p-2'>
                    <label>Enter details of the Appointment</label>
                    <input 
                        className='form-control'
                        type='text'
                        name='details'
                        value={details}
                        onChange={(e)=>setDetails(e.target.value)}
                    >
                    </input>
                </div>

                <button type="submit">Make New Appointment</button>
            </form>
            <button onClick={e=>setDisplayAppointmentForm(false)}>Cancel</button>
        </div>
    )

}

export default AppointmentForm