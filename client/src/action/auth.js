import axios from 'axios'
import {
    REGISTER_SUCCESS,REGISTER_FAIL,USER_LOADED,AUTH_ERROR,LOGIN_SUCCESS,LOGIN_FAIL,LOG_OUT
} from './types'
import setAuthToken from '../utils/setAuthToken'
import {setAlert} from '../action/alert'

// load USer

 export const LoadUser=()=>async dispatch=>{
    if (localStorage.token){
        setAuthToken(localStorage.token)
    }

    try {
        const res= await axios.get('/api/auth')
        dispatch({
            type:USER_LOADED,
            payload:res.data
        })
        
    } catch (err) {
        dispatch({
            type:AUTH_ERROR
        })
    }
 }


export const register=({name,email,password})=>async dispatch=>{
  
    const config={
        headers:{
            'Content-Type':'application/json'
        }
    }

    const body=JSON.stringify({name,email,password})
    try {
        const res= await axios.post('/api/users',body,config)
        dispatch({
            type:REGISTER_SUCCESS,
            payload:res.data
        })
        dispatch(LoadUser())
        
    } catch (err) {
         dispatch({type:REGISTER_FAIL})
         const errors=err.response.data.errors
         if (errors){
             errors.forEach(error=>dispatch(setAlert(error.msg,'danger')))
         }
    }

}

export const login=(email,password)=>async dispatch=>{
  
    const config={
        headers:{
            'Content-Type':'application/json'
        }
    }

    const body=JSON.stringify({email,password})
    try {
        const res= await axios.post('/api/auth',body,config)
        dispatch({
            type:LOGIN_SUCCESS,
            payload:res.data
        })
        dispatch(LoadUser())
        
    } catch (err) { 
         const errors=err.response.data.errors
         if (errors){
             errors.forEach(error=>dispatch(setAlert(error.msg,'danger')))
         }
         dispatch({type:LOGIN_FAIL})
    }

}

// log out

export const logout=()=>dispatch=>{
    dispatch({
        type:LOG_OUT
    })
}