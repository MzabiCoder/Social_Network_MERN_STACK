import React from 'react'
import {Link} from 'react-router-dom'
import {Fragment} from 'react'

const Navbar = () => {
    return (
        <Fragment>
        <nav className="navbar bg-dark">
      <h1>
        <Link a to="/">
        
        <i className="fas fa-code"></i> DevConnector
        </Link>
      </h1>
      <ul>
        <li>
        <a href="">Developers</a>
        </li>
        <li>
        <Link to="/register">Register</Link>
        </li>
        <li>
        <Link to="/login">Login</Link>
        </li>
      </ul>
    </nav>
    </Fragment>
         
            
      
    )
}

export default Navbar