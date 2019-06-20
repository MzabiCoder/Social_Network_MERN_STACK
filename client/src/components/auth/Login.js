import React from 'react'
import {Fragment,useState} from 'react'
import axios from 'axios'
import {Link} from 'react-router-dom'

const Login = () => {

   const [FormatData,SetFormatData]= useState({
     email:'',
     password:''
   })
   const {email,password}= FormatData

   // to use name as a key we have to out the way [e.target.name]
  const onChange=e=>SetFormatData({...FormatData,[e.target.name]:e.target.value})

   // what is below is testing registration with ing the component not action

  // const Submit= async e=>{
  //   e.preventDefault()

  //   if (password !== password2){
  //     console.log('password not match!!')
  //   }else {
     
  //     const newUser={
  //       name:name,
  //       email,
  //       password,

  //     }
  //     try{

  //       const config={
  //         headers:{
  //           'Content-Type':'application/json'
  //         }
  //       }

  //       const body=JSON.stringify(newUser)
  //       const res= await axios.post('/api/users/',body,config)
  //       console.log(res.data)

  //     }catch(err){
  //       console.log(err.response.data)
  //     }
  //   }
  // }

  const Submit= async e=>{
    e.preventDefault()

  }

  
    return (
        <Fragment>
        <section className="container">
        <h1 className="large text-primary">Log in</h1>
        <p className="lead"><i className="fas fa-user"></i> Sing in Account</p>
        <form className="form" onSubmit={Submit} >
          
          <div className="form-group">
            <input  onChange={onChange} type="email" placeholder="Email Address" value={email}name="email" />
            <small className="form-text">This site uses Gravatar so if you want a profile image, use a
              Gravatar email</small>
          </div>
          <div className="form-group">
            <input
              type="password"
              placeholder="Password"
              name="password"
              minLength="6"
              onChange={onChange}
              value={password}
             

            />
          </div>
         
          <input type="submit" className="btn btn-primary" value='Login' />
        </form>
        <p className="my-1">
          dont have an account? <Link to="/register">Sign Up</Link>
        </p>
      </section>
        </Fragment>
    )
}

export default Login
