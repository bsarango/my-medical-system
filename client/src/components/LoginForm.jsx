import React from 'react'
import {useState} from 'react'
import {useOutletContext} from 'react-router-dom'

function LoginForm(){
    const [username, setUsername] = useState("")   
    const [password, setPassword] = useState("")

    const {loggedIn}=useOutletContext()

    function handleSubmit(e){
        e.preventDefault();
        const credentialsObj = {
            username : username,
            password : password
        }
        fetch('/api/login',
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body : JSON.stringify(credentialsObj),
        })
        .then(r=>{if(r.ok){
            r.json().then(signedInPatient=>{console.log(signedInPatient),loggedIn[1](true)})
        }})
        
    };

    return(
        <div className="bg-yellow-100">
            <h2>Please Enter Your Username and Password to Login!</h2>
            <form className="bg-yellow-100 border-solid border-1 border-green-600 box-border h-40 w-80 p-4 border-4 text-center absolute inset-1/3 top-48" onSubmit = {handleSubmit}>
                <label htmlFor="username">Username</label>
                <input
                    className="border-solid border-2 border-green-600 py-1 space-y-1"
                    id = "username"
                    type = "text"
                    name = "username"
                    value = {username}
                    onChange = {e=>setUsername(e.target.value)}
                />
                <label htmlFor="password">Password</label>
                <input
                    className="border-solid border-2 border-green-600 py-1 space-y-1"
                    id = "password"
                    type = "text"
                    name = "password"
                    value = {password}
                    onChange = {e=>setPassword(e.target.value)}
                />
                <button type="submit" className="bg-green-200 hover:bg-emerald-900 text-green-700 font-semibold hover:text-white py-2 px-4 border border-green-300 hover:border-transparent rounded">Login</button>
            </form>
        </div>
    )
}

export default LoginForm