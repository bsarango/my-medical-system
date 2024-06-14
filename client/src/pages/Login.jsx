import React,{useEffect, setState} from 'react'
import LoginForm from '../components/LoginForm'
import {useOutletContext} from "react-router-dom"

function Login(){

    const {loggedIn} = useOutletContext()
    if(loggedIn){
        return(
            <p>Already Logged In. Please return Home or select an option from the tabs to continue</p>
        )
    }

    return(
        <div className = "text-center bg-yellow-100">
        <h3 className="font-sans font-semibold">Enter your credentials below and press submit to Sign In</h3>
        <br></br>
        <LoginForm/>
    </div>
    )
}

export default Login