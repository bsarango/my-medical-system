import React,{useState, useEffect} from 'react'

function OrderForm({onAddOrder}){

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
        const formValues = {
            category:category,
            complete:complete,
            details:details,
            patient: selectedPatient
        }
        
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
        <div className="">
            <form className = "userForm" onSubmit = {handleSubmit}>
                <div className='p-2'>
                    <label> Enter the type of Order</label>
                    <select onChange={(e)=>{setCategory(e.target.value)}}>
                        <option  
                            value='medication'
                            name='medication'
                        >
                        Medication
                        </option>
                    
                        <option
                            value='therapy'
                            name='therapy'
                        >
                        Therapy
                        </option>
                    
                        <option
                            value='scan'
                            name='scan'
                        >
                        Scan
                        </option>
                    
                        <option
                            value='test'
                            name='test'
                        >
                        Test
                        </option>
                        
                        <option
                            value='other'
                            name='other'
                        >
                        Other
                        </option>
                        <option
                            value='labs'
                            name='labs'
                        >
                        Labs
                        </option>
                    
                        <option
                            value='discontinue'
                            name='discontinue'
                        >
                        Discontinue
                        </option>
                    </select>
                </div>
                
                <div className="p-2">
                    <label>Enter Additional Details for this Order</label>
                    <input
                        className=""
                        type = "text"
                        name = "details"
                        value = {details}
                        onChange = {(e)=>{setDetails(e.target.value)}}
                    />
                </div>
                
                <div className='p-2'>
                    <label>Select Patient for the Order</label>
                    <select onChange={e=>{setSelectedPatient(e.target.value)}}>
                    {patientOptions}
                    </select>
                </div>
                
                <button type="Submit" className="">Submit Order</button>
            </form>
        </div>
    )
}

export default OrderForm