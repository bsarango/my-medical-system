import React from 'react'
import {NavLink} from 'react-router-dom'
import Navbar from 'react-bootstrap/Navbar'
import Container from 'react-bootstrap/Container'

function NavigationBar(){
    return(
        <Navbar expand="lg" className="bg-body-tertiary border border-secondary p-2">
            <Container>
                <Navbar.Brand href="/">One Medical Central</Navbar.Brand>

                <NavLink  to="/"
                    className="border border-primary rounded border-2"
                >
                    Home
                </NavLink>
                <NavLink  to="/signup"
                    className ="border border-primary rounded border-2" 
                >
                    SignUp
                </NavLink>
                <NavLink  to="/login"
                    className = "border border-primary rounded border-2"
                >
                    Login
                </NavLink>
                <NavLink  to="/appointments"
                    className = "border border-primary rounded border-2"
                >
                    My Appointments
                </NavLink>
                <NavLink  to="/orders"
                    className ="border border-primary rounded border-2"
                >
                    My Orders
                </NavLink>
            </Container>
        </Navbar>
    )
}

export default NavigationBar