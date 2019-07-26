import React,{Fragment,useState} from 'react'
import {Link} from 'react-router-dom'
import axios from 'axios'

const Login = () => {


     const [formData,setFormData]=useState([{
         name:'',
         email:'',
         password:'',
         password2:''
     }])

     const {name,email,password,password2}=formData

     const submit= async e=>{
         e.preventDefault()
      
            // const newUser={
            //     name,
            //     email,
            //     password
            // }
            // try {
            //     const config={
            //         headers:{
            //             'Content-Type':'application/json',
            //         }
            //     }
            //     const body=JSON.stringify(newUser)
            //     const res=await axios.post('/api/users',body,config)
            //     console.log(res.data)
                
            // } catch (error) {
            //      console.log(error.response.data)
            // }
            console.log('SUCCESS')
        
     }
     const onChange=e=>setFormData({...formData,[e.target.name]:e.target.value})

    return (
        <Fragment>
       <h1 className="large text-primary">Sign In</h1>
      <p className="lead"><i className="fas fa-user"></i> Sign into Your Account</p>
      <form onSubmit={submit} className="form" action="create-profile.html">
       
        <div className="form-group">
          <input onChange={e=>onChange(e)} type="email"  value={email} placeholder="Email Address" name="email" />
        </div>
        <div className="form-group">
          <input
            type="password"
            placeholder="Password"
            name="password"
            minLength="6"
            value={password}
            onChange={e=>onChange(e)}
          />
        </div>
        
        <input type="submit" className="btn btn-primary" value="Login" />
      </form>
      <p className="my-1">
        Don't have an account? <Link to="/register">Sign Up</Link>
      </p>
    </Fragment>
    )
}

export default Login
