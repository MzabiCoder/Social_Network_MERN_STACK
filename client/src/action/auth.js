import axios from 'axios'
import {
    REGISTER_SUCCESS,REGISTER_FAIL,USER_LOADED,CLEAR_PROFILE,AUTH_ERROR,LOGIN_FAIL,LOGIN_SUCCESS,LOG_OUT
} from './types'

import {setAlert} from '../action/alert'
import setAuthToken from '../utils/setAuthToken'


// load User every time the main component is loaded

export const LoadUser=()=>async dispatch=>{
    // we need to see if there is a token, and if there is we put in  global header (where we put x-ath-token)
    // if we have a token in local storage we have to always do it

    if (localStorage.token){
        setAuthToken(localStorage.token)
    }

    try{
       const res= await axios.get('/api/auth')
       dispatch({
           type:USER_LOADED,
           payload:res.data
       })
    }catch(err){
        dispatch({
            type:AUTH_ERROR
        })
    }
}

// Register user

export  const register=({name,email,password})=> async dispatch =>{
   const config={
       headers:{
           'Content-Type':'application/json'
       }
   }

   // preparing the data to send
   const body=JSON.stringify({name,email,password})

   try{
       const res= await axios.post('/api/users',body,config)
       dispatch({
           type:REGISTER_SUCCESS,
           payload:res.data
       })

       dispatch(LoadUser())

      

   }catch(err){
       const errors=err.response.data.errors 
       
       if (errors){
           errors.forEach(error=>dispatch(setAlert(error.msg,'danger')))
       }
      dispatch({
        type:REGISTER_FAIL
      })
   }
}

export  const login=(email,password)=> async dispatch =>{
    const config={
        headers:{
            'Content-Type':'application/json'
        }
    }
 
    // preparing the data to send
    const body=JSON.stringify({email,password})
 
    try{
        const res= await axios.post('/api/auth',body,config)
        dispatch({
            type:LOGIN_SUCCESS,
            payload:res.data
        })
        dispatch(LoadUser())
 
       
 
    }catch(err){
        const errors=err.response.data.errors 
        
        if (errors){
            errors.forEach(error=>dispatch(setAlert(error.msg,'danger')))
        }
       dispatch({
         type:LOGIN_FAIL
       })
    }
 }

 export const logout=()=>dispatch=>{
    dispatch({type:CLEAR_PROFILE})
    dispatch({type:LOG_OUT})
 }