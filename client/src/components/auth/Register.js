import React,{Fragment,useState} from 'react'
import {Link,Redirect} from 'react-router-dom'
//import axios from 'axios'
import {connect} from 'react-redux'
import {setAlert} from '../../action/alert'
import PropTypes from 'prop-types'
import {register} from '../../action/auth'
 
const Register = ({setAlert,register,isAuthenticated}) => {


     const [formData,setFormData]=useState([{
         name:'',
         email:'',
         password:'',
         password2:''
     }])

     const {name,email,password,password2}=formData

     const submit= async e=>{
         e.preventDefault()
         if(password !== password2){
            setAlert('Password dont match!!!!','danger')
            
         } else{
            register({name,email,password})
        }
     }
     const onChange=e=>setFormData({...formData,[e.target.name]:e.target.value})

     if(isAuthenticated){
      return <Redirect to="/dashboard"/>
    }
    return (
        <Fragment>
       <h1 className="large text-primary">Sign Up</h1>
      <p className="lead"><i className="fas fa-user"></i> Create Your Account</p>
      <form onSubmit={submit} className="form" action="create-profile.html">
        <div className="form-group">
          <input onChange={e=>onChange(e)} type="text" placeholder="Name" value={name} name="name"   />
        </div>
        <div className="form-group">
          <input onChange={e=>onChange(e)} type="email"  value={email} placeholder="Email Address" name="email" />
          <small className="form-text"
            >This site uses Gravatar so if you want a profile image, use a
            Gravatar email</small>
        </div>
        <div className="form-group">
          <input
            type="password"
            placeholder="Password"
            name="password"
        
            value={password}
            onChange={e=>onChange(e)}
          />
        </div>
        <div className="form-group">
          <input
            type="password"
            placeholder="Confirm Password"
            name="password2"
         
            value={password2}
            onChange={e=>onChange(e)}
          />
        </div>
        <input type="submit" className="btn btn-primary" value="Register" />
      </form>
      <p className="my-1">
        Already have an account? <Link to="/login">Sign In</Link>
      </p>
    </Fragment>
    )
}

Register.propTypes={
    setAlert:PropTypes.func.isRequired,
    register:PropTypes.func.isRequired,
    isAuthenticated:PropTypes.bool
}

const map=state=>({
  isAuthenticated:state.auth.isAuthenticated
})

export default connect(map,{setAlert,register})(Register)
