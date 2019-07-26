import React,{Fragment,useState} from 'react'
import axios from 'axios'

const Register = () => {


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
             console.log('Paswword dont match!!!!')
            
         } else{
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
     }
     const onChange=e=>setFormData({...formData,[e.target.name]:e.target.value})

    return (
        <Fragment>
       <h1 className="large text-primary">Sign Up</h1>
      <p className="lead"><i className="fas fa-user"></i> Create Your Account</p>
      <form onSubmit={submit} className="form" action="create-profile.html">
        <div className="form-group">
          <input onChange={e=>onChange(e)} type="text" placeholder="Name" value={name} name="name" required />
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
            minLength="6"
            value={password}
            onChange={e=>onChange(e)}
          />
        </div>
        <div className="form-group">
          <input
            type="password"
            placeholder="Confirm Password"
            name="password2"
            minLength="6"
            value={password2}
            onChange={e=>onChange(e)}
          />
        </div>
        <input type="submit" className="btn btn-primary" value="Register" />
      </form>
      <p className="my-1">
        Already have an account? <a href="login.html">Sign In</a>
      </p>
    </Fragment>
    )
}

export default Register
