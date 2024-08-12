import React from "react";
import {Link, useOutletContext} from "react-router-dom"

function Home(){

    const {loggedIn} = useOutletContext()

    if(!loggedIn[0]){
        return(
            <div>
                <p>Please Log in to Use our Services</p>
                <Link to = "/login">
                    <button>Login</button>
                </Link>
            </div>
        )
    }

    return(
        <div className="w-100 p-3 text-center position-relative">
            <p className = "fs-4 p-3 position-absolute top-0 bottom-50 start-50 translate-middle">
                Welcome to One Medical Central.
                We hope that you are having a good day so far. 
                Best wishes in your care to your patients.
                Did you know that an owl thats a doctor would be called Dr. Who? - Just some Medical Comedy
                Feel free to view your orders, appointments, or patients using one of the tabs above 
            </p>
            
            <p className="p-3 m-position-absolute">
                Please hit log out before leaving your station to protect your patients' information. Thank you!
            </p>
        </div>
    )
}

export default Home