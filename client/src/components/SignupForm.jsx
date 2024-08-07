import React, {useState} from 'react'

function SignupForm(){

    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [firstName, setFirstName] = useState("")
    const [specialty, setSpecialty] = useState("")
    const [lastName, setLastName] = useState("")
    const [officeAddress, setOfficeAddress] = useState("")
    const [officeNumber, setOfficeNumber] = useState("")

    function handleSubmit(e){
        e.preventDefault()
        const formValues = {
            username:username,
            password:password,
            firstName:firstName,
            lastName:lastName,
            specialty: specialty,
            officeAddress:officeAddress,
            officeNumber:officeNumber
        }
        
        fetch("/api/signup",
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body : JSON.stringify(formValues),
        })
        .then(r=>{
            if(r.ok){
                r.json()
                .then(newPhysician=>{console.log(newPhysician),console.log("Signup successful")})
            }
        })
        console.log(formValues)
    }

    return(
        <div>
            <form className = "" onSubmit={handleSubmit}>
                <div className="p-2">
                    <label htmlFor="username">Username</label>
                    <input
                        className="border-solid border-2 border-green-600 py-1 space-y-1"
                        type = "text"
                        name = "username"
                        value = {username}
                        onChange = {e=>setUsername(e.target.value)}
                    />
                </div>
                <div className="p-2">
                    <label htmlFor="password">Password</label>
                    <input
                        className="border-solid border-2 border-green-600 py-1 space-y-1"
                        type = "text"
                        name = "password"
                        value = {password}
                        onChange = {e=>setPassword(e.target.value)}
                    />
                </div>
                
                <div className="p-2">
                    <label htmlFor='firstName'>First Name</label>
                    <input
                        className="border-solid border-2 border-green-600 py-1 space-y-1"
                        type = "text"
                        name = "firstName"
                        value = {firstName}
                        onChange = {e=>setFirstName(e.target.value)}
                    />
                </div>
                
                <div className='p-2'>
                    <label htmlFor='lastName'>Last Name</label>
                    <input
                        className="border-solid border-2 border-green-600 py-1 space-y-1"
                        type = "text"
                        name = "lastName"
                        value = {lastName}
                        onChange = {e=>setLastName(e.target.value)}
                    />
                </div>
                
                <div className='p-2'>
                    <label htmlFor='officeAddress'>Office Address</label>
                    <input
                        className="border-solid border-2 border-green-600 py-1 space-y-1"
                        type = "text"
                        name = "officeAddress"
                        value = {officeAddress}
                        onChange = {e=>setOfficeAddress(e.target.value)}
                    />
                </div>
                
                <div>
                    <label htmlFor='officeNumber'>Office Phone Number</label>
                    <input
                        className="border-solid border-2 border-green-600 py-1 space-y-1"
                        type = "text"
                        name = "officeNumber"
                        value = {officeNumber}
                        onChange = {e=>setOfficeNumber(e.target.value)}
                    />
                </div>
                
                <div className='p-2'>
                    <select onChange={e=>{setSpecialty(e.target.value)}}>
                        <option
                            value = "cardiology"
                        >
                            Cardiology
                        </option>
                        
                        <option
                            value = "pediatrics"
                        >
                        Pediatrics
                        </option>
                    
                        <option
                            value="primary care"
                        >
                            Primary Care
                        </option>
                        <option
                            value="nephrology"
                        >
                            Nephrology
                        </option>
                        
                        <option
                            value="obstetrics and gynecology"
                        >
                            OBGYN
                        </option>
                        
                        <option
                            value="pulmonary"
                        >
                        Pulmonary
                        </option>
                        
                        <option
                            value="endocrinology"
                        >
                            Endocrinology
                        </option>
                        <option
                            value='dermatology'
                        >
                            Dermatology
                        </option>
                    </select>
                </div>
                
                <button type="submit" className="bg-green-200 hover:bg-emerald-900 text-green-700 font-semibold hover:text-white py-2 px-4 border border-green-300 hover:border-transparent rounded">SignUp</button>
            </form>
        </div>
    );
};

export default SignupForm