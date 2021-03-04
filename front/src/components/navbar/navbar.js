import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import './navbar.css'
import {IsLoggedContext} from '../../App'

export default function NavBar() {

  const navStyle = {
    'color': '#3BBA9C',
    'textDecoration': 'none'
  }
  const isLoggedContext = useContext(IsLoggedContext)

  const handleLogout = () => {
    isLoggedContext.isLoggedDispatch(false)
  }

  return(
    <nav>
      <h3> Dashboard </h3>
      <ul className="navLinks">
        <Link style={navStyle}  to="/" >
          <li>Home</li>
        </Link>

        <Link style={navStyle} to="/dashboards" >
          <li>Dashboards</li>
        </Link>

        { !isLoggedContext.isLoggedState && 
          <Link style={navStyle} to="/login" >
            <li>Login</li>
          </Link>
        }
        { isLoggedContext.isLoggedState && 
          <Link style={navStyle}>
            <li onClick={handleLogout} >Log Out</li>
          </Link>
        }
      </ul>
    </nav>
  )
}