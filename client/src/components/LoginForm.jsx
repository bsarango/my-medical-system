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
            <form onSubmit = {handleSubmit}>
                <label htmlFor="username">Username</label>
                <input
                    id = "username"
                    type = "text"
                    name = "username"
                    value = {username}
                    onChange = {e=>setUsername(e.target.value)}
                />
                <label htmlFor="password">Password</label>
                <input
                    id = "password"
                    type = "text"
                    name = "password"
                    value = {password}
                    onChange = {e=>setPassword(e.target.value)}
                />
                <button type="submit">Login</button>
            </form>
        </div>
    )
}

export default LoginForm