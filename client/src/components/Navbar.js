import React from 'react'
import {Link} from 'react-router-dom'
import {Fragment} from 'react'
import {logout} from '../action/auth'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'

const Navbar = ({auth:{loading,isAuthenticated},logout}) => {
  const gestLink=(
    <ul>
    <li>
    <a href="#!">Developers</a>
    </li>

    <li>
    <Link to="/register"  >Register</Link> 
    </li>

    <li>
    <Link to="/login">Login</Link> 
    </li>
    
  </ul>
  )  

  const authlink=(
    <ul>
    <li>
    <a onClick={logout} href="">
    <i className="fas fa-sign-out-alt"></i>{' '}
    <span className="hide-sm"> Logout</span></a>
    </li>

    
  </ul>
  ) 


  
  return (
        <Fragment>
        <nav className="navbar bg-dark">
      <h1>
        <Link a to="/">
        
        <i className="fas fa-code"></i> DevConnector
        </Link>
      </h1>
     {!loading && (<Fragment>{isAuthenticated ? authlink :gestLink}</Fragment>)}
    </nav>
    </Fragment>
         
            
      
    )
}

Navbar.propTypes={
 login:PropTypes.func.isRequired,
 auth:PropTypes.object.isRequired
}

const map=state=>({
 auth:state.auth
})

export default connect(map,{logout})(Navbar)
