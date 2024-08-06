import React from 'react'
import {NavLink} from 'react-router-dom'
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Navbar'
import Container from 'react-bootstrap/Container'

function NavBar(){
    return(
        <Navbar>
            <NavLink  to="/"
                className=""
        >
            Home
        </NavLink>
        <NavLink  to="/signup"
            className ="" 
        >
            SignUp
        </NavLink>
        <NavLink  to="/login"
            className = ""
        >
            Login
        </NavLink>
        <NavLink  to="/appointments"
            className = ""
        >
            My Appointments
        </NavLink>
        <NavLink  to="/orders"
            className =""
            My Orders
        >
        </NavLink>
        </Navbar>
    )
}

export default NavBar