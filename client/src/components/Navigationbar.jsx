import React from 'react'
import {NavLink} from 'react-router-dom'
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import Container from 'react-bootstrap/Container'

function NavigationBar(){
    return(
        <Navbar expand="lg" className="bg-body-tertiary">
            <Container>
                <Navbar.Brand href="/">One Medical Central</Navbar.Brand>
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
                >
                    My Orders
                </NavLink>
            </Container>
        </Navbar>
    )
}

export default NavigationBar