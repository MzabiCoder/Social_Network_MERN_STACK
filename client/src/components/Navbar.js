import React from 'react'
import {Link} from 'react-router-dom'
import {Fragment} from 'react'
import {logout} from '../action/auth'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'

const Navbar = ({logout,isAuthenticated}) => {
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
        { (!isAuthenticated) ? <Link to="/register"  >Register</Link> : null }
        </li>

        <li>
        { (!isAuthenticated) ? <Link to="/login">Login</Link> : null }
        </li>
        
      </ul>
    </nav>
    </Fragment>
         
            
      
    )
}

Navbar.propTypes={
 login:PropTypes.func.isRequired,
 isAuthentificated:PropTypes.bool


}

const mapTstatToprops=state=>({
  isAuthenticated:state.auth.isAuthenticated
})

export default connect(mapTstatToprops,{logout})(Navbar)
