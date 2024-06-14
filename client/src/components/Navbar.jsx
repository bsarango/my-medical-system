import React from 'react'
import {NavLink} from 'react-router-dom'

function NavBar(){
    return(
        <nav>
        <NavLink  to="/"
            className="nav-link bg-blue-300 hover:bg-blue-900 text-stone-800 font-semibold hover:text-white py-2 px-4 border border-blue-300 hover:border-transparent rounded"
        >
            Home
        </NavLink>
        <NavLink  to="/signup"
            className = "nav-link bg-blue-300 hover:bg-blue-900 text-stone-800 font-semibold hover:text-white py-2 px-4 border border-blue-300 hover:border-transparent rounded"
        >
            SignUp
        </NavLink>
        <NavLink  to="/login"
            className = "nav-link bg-blue-300 hover:bg-blue-900 text-stone-800 font-semibold hover:text-white py-2 px-4 border border-blue-300 hover:border-transparent rounded"
        >
            Login
        </NavLink>
        <NavLink  to="/appointments"
            className = "nav-link bg-blue-300 hover:bg-blue-900 text-stone-800 font-semibold hover:text-white py-2 px-4 border border-blue-300 hover:border-transparent rounded"
        >
            My Appointments
        </NavLink>
        <NavLink  to="/orders"
            className = "nav-link bg-blue-300 hover:bg-blue-900 text-stone-800 font-semibold hover:text-white py-2 px-4 border border-blue-300 hover:border-transparent rounded"
        >
            My Orders
        </NavLink>
        </nav>
    )
}

export default NavBar