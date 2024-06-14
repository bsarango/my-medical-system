import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { createBrowserRouter, RouterProvider} from 'react-router-dom'
import Home from './pages/Home.jsx'
import Signup from './pages/Signup.jsx'
import Login from './pages/Login.jsx'
import AppointmentPage from './pages/AppointmentPage.jsx'
import Orders from './pages/Orders.jsx'

const router = createBrowserRouter([
  {
    path:"/",
    element: <App/>,
    children:[
      {
        path:"/",
        element:<Home/>
      },
      {
        path:"/signup",
        element:<Signup/>
      },
      {
        path:"/login",
        element:<Login/>
      },
      {
        path:"/appointments",
        element:<AppointmentPage/>
      },
      {
        path:"/orders",
        element:<Orders/>
      }
    ]
  }
])

const root = ReactDOM.createRoot(document.getElementById('root')).render(
  // <React.StrictMode>
  //   <App />
  // </React.StrictMode>,
  <RouterProvider router = {router}/>
)
