import React,{useEffect, setState} from 'react'
import LoginForm from '../components/LoginForm'
import {useOutletContext} from "react-router-dom"

function Login(){

    const {loggedIn} = useOutletContext()
    if(loggedIn[0]){
        return(
            <p>Already Logged In. Please return Home or select an option from the tabs to continue</p>
        )
    }

    return(
        <div>
            <h3>Enter your credentials below and press submit to Sign In</h3>
            <br></br>
            <LoginForm/>
        </div>
    )
}

export default Login