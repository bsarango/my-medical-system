import React from "react";
import {Link, useOutletContext} from "react-router-dom"

function Home(){

    const {loggedIn} = useOutletContext()

    if(!loggedIn[0]){
        return(
            <div>
                <p>Please Log in to Use our Services</p>
                <Link to = "/login">
                    <button className="bg-transparent hover:bg-blue-900 text-green-700 font-semibold hover:text-white py-2 px-4 border border-blue-300 hover:border-transparent rounded">Login</button>
                </Link>
            </div>
        )
    }

    return(
        <div>
            <p>
                Welcome to One Medical Central.
                We hope that you are having a good day so far. 
                Best wishes in your care to your patients.
                Did you know that an owl thats a doctor would be called Dr. Who? - Just some Medical Comedy
                Feel free to view your orders, appointments, or patients using one of the tabs above 
            </p>
            <p>
                Please hit log out before leaving your station to protect your patients' information. Thank you!
            </p>
        </div>
    )
}

export default Home