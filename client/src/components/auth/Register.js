import React from 'react'
import {Fragment,useState} from 'react'

const Register = () => {

   const [FormatData,SetFormatData]= useState({
     name:'',
     email:'',
     password:'',
     password2:''
   })
   const {name,email,password,password2}= FormatData

   // to use name as a key we have to out the way [e.target.name]
  const onChange=e=>SetFormatData({...FormatData,[e.target.name]:e.target.value})

  const Submit=e=>{
    e.preventDefault()

    if (password !== password2){
      console.log('password not match!!')
    }else {
      console.log(FormatData)
    }
  }

  
    return (
        <Fragment>
        <section className="container">
        <h1 className="large text-primary">Sign Up</h1>
        <p className="lead"><i className="fas fa-user"></i> Create Your Account</p>
        <form className="form" onSubmit={Submit} >
          <div className="form-group">
            <input type="text" placeholder="Name" name="name" required  value={name} onChange={onChange} />
          </div>
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
          <div className="form-group">
            <input
              type="password"
              placeholder="Confirm Password"
              name="password2"
              minLength="6"
              onChange={onChange}
              value={password2}
            />
          </div>
          <input type="submit" className="btn btn-primary" value="Register" />
        </form>
        <p className="my-1">
          Already have an account? <a href="login.html">Sign In</a>
        </p>
      </section>
        </Fragment>
    )
}

export default Register
