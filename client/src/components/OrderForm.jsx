import React,{useState} from 'react'

function OrderForm({ onAddOrder}){

    const[patients, setPatients] = useState([])

    const[category, setCategory] = useState("")
    const[complete, setComplete] = useState(false)
    const[details, setDetails] = useState("")
    const[selectedPatient, setSelectedPatient] = useState(null)

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

    function handleSubmit(e){
        e.preventDefault();
        setSpecialty(selectedSpecialty)

        const formValues = {
            category:category,
            complete:complete,
            details:details,
            patient: selectedPatient
        }
        console.log(appointmentObj)
        fetch('/api/orders',
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body : JSON.stringify(formValues),
        })
        .then(r=>{if(r.ok){
            r.json().then(newOrder=>onAddOrder(newOrder))
        }})
    }


    return(
        <div>
            <h2>Enter a new Order with the form</h2>
            <form className = "userForm" onSubmit = {handleSubmit}>
                <label> Enter the type of Order</label>
                <select onChange={(e)=>{setCategory(e.target.value)}}>
                    <option  
                        value={'medication'}
                        name={'medication'}
                    >
                        Medication
                    </option>
                    <option
                        value={'therapy'}
                        name={'therapy'}
                    >
                        Therapy
                    </option>
                    <option
                        value={'scan'}
                        name={'scan'}
                    >
                        Scan
                    </option>
                    <option
                        value={'test'}
                        name={'test'}
                    >
                        Test
                    </option>
                    <option
                        value={'other'}
                        name={'other'}
                    >
                        Other
                    </option>
                    <option
                        value={'labs'}
                        name={'labs'}
                    >
                        Labs
                    </option>
                    <option
                        value={'discontinue'}
                        name={'discontinue'}
                    >
                        Discontinue
                    </option>
                </select>
                <br></br>
                <input
                    className="border-solid border-2 border-green-600 py-1 space-y-1"
                    type = "text"
                    name = "details"
                    value = {details}
                    onChange = {(e)=>{setDetails(e.target.value)}}
                />
                <br></br>
                <label>Is the Order completed?</label>
                <button onClick={e=>{setComplete(True)}}></button>
                <br></br>
                <label>Select Patient for the Order</label>
                <select onClick={e=>{setSelectedPatient(e.target.value)}}>
                    {patientOptions}
                </select>
                <button type="Submit" className="bg-green-200 hover:bg-emerald-900 text-green-700 font-semibold hover:text-white py-2 px-4 border border-green-300 hover:border-transparent rounded">Make Appointment</button>
            </form>
        </div>
    )
}

export default OrderForm