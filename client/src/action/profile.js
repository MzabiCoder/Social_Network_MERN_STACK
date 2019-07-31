import axios from 'axios'
import {setAlert} from '../action/alert'
import {GET_PROFILE,GET_REPOS,GET_PROFILES,CLEAR_PROFILE,PROFILE_ERROR,UPDATE_PROFILE,ACCOUNT_DELETED} from './types'



// get current user profile

export const getCurrentProfile=()=>async dispatch=>{
  dispatch({type:CLEAR_PROFILE})
  try {
      
    const res= await axios.get('/api/profile/me')
    dispatch({
        type:GET_PROFILE,
        payload:res.data
    })
  } catch (error) {
      dispatch({
          type:PROFILE_ERROR,
          payload:{
              msg:error.response.statusText,
              status:error.response.status
          }
      })
  }
}


// get all prfiles
export const getProfiles=()=>async dispatch=>{
  dispatch({type:CLEAR_PROFILE})
  try {
      
    const res= await axios.get('/api/profile')
    dispatch({
        type:GET_PROFILES,
        payload:res.data
    })
  } catch (error) {
      dispatch({
          type:PROFILE_ERROR,
          payload:{
              msg:error.response.statusText,
              status:error.response.status
          }
      })
  }
}


// get profile by id
export const getProfileByid=userId=>async dispatch=>{
  try {
      
    const res= await axios.get(`/api/profile/user/${userId}`)
    dispatch({
        type:GET_PROFILE,
        payload:res.data
    })
  } catch (error) {
      dispatch({
          type:PROFILE_ERROR,
          payload:{
              msg:error.response.statusText,
              status:error.response.status
          }
      })
  }
}

// get Github repos
export const  getGithubRepos=username=>async dispatch=>{
  try {
      
    const res= await axios.get(`/api/profile/github/${username}`)
    dispatch({
        type:GET_REPOS,
        payload:res.data
    })
  } catch (error) {
      dispatch({
          type:PROFILE_ERROR,
          payload:{
              msg:error.response.statusText,
              status:error.response.status
          }
      })
  }
}


// create or update profile

export const createProfile=(formData,history,edit=false)=>async dispatch=>{
 try {
  
 const config={
   headers:{
     'Content-Type':'application/json'
   }
 }

 const res=await axios.post('/api/profile',formData,config)
 dispatch({
   type:GET_PROFILE,
   payload:res.data
 })
 dispatch(setAlert(edit ? 'Profile Updated':'Profile created','success'))

  if(!edit){
    history.push('/dashboard')
  }

 } catch (error) {
  const errors=error.response.data.errors
  if (errors){
      errors.forEach(error=>dispatch(setAlert(error.msg,'danger')))
  }
  dispatch({
    type:PROFILE_ERROR,
    payload:{
        msg:error.response.statusText,
        status:error.response.status
    }
})
 }
}

// add experience action  

export const addExperience=(formData,history)=>async dispatch=>{
  try {
  
    const config={
      headers:{
        'Content-Type':'application/json'
      }
    }
   
    const res=await axios.put('/api/profile/experience',formData,config)
    dispatch({
      type:UPDATE_PROFILE,
      payload:res.data
    })
    dispatch(setAlert('experience added','success'))
   
  
       history.push('/dashboard')
     
   
    } catch (error) {
     const errors=error.response.data.errors
     if (errors){
         errors.forEach(error=>dispatch(setAlert(error.msg,'danger')))
     }
     dispatch({
       type:PROFILE_ERROR,
       payload:{
           msg:error.response.statusText,
           status:error.response.status
       }
   })
    }
}

export const addEducation=(formData,history)=>async dispatch=>{
  try {
  
    const config={
      headers:{
        'Content-Type':'application/json'
      }
    }
   
    const res=await axios.put('/api/profile/education',formData,config)
    dispatch({
      type:UPDATE_PROFILE,
      payload:res.data
    })
    dispatch(setAlert('education added added','success'))
   
  
       history.push('/dashboard')
     
   
    } catch (error) {
     const errors=error.response.data.errors
     if (errors){
         errors.forEach(error=>dispatch(setAlert(error.msg,'danger')))
     }
     dispatch({
       type:PROFILE_ERROR,
       payload:{
           msg:error.response.statusText,
           status:error.response.status
       }
   })
    }
}

// delete experience

export const delteExp=id=>async dispatch=>{
  try {
     const res = await axios.delete(`/api/profile/experience/${id}`)
     dispatch({
       type:UPDATE_PROFILE,
       payload:res.data
     })
     dispatch(setAlert('experience Removed','danger'))

    
  } catch (error) {
    dispatch({
      type:PROFILE_ERROR,
      payload:{
          msg:error.response.statusText,
          status:error.response.status
      }
  })
  }
}

// delete ediucation

export const delteEdu=id=>async dispatch=>{
  try {
     const res = await axios.delete(`/api/profile/education/${id}`)
     dispatch({
       type:UPDATE_PROFILE,
       payload:res.data
     })
     dispatch(setAlert('education Removed','danger'))

    
  } catch (error) {
    dispatch({
      type:PROFILE_ERROR,
      payload:{
          msg:error.response.statusText,
          status:error.response.status
      }
  })
  }
}

// delete acount & profile

export const delteAcc=()=>async dispatch=>{

   if(window.confirm('Are you sure !! This can NOT be undon')){
    try {
     await axios.delete('/api/profile')
      dispatch({
        type:CLEAR_PROFILE,
      })
      dispatch({
        type:ACCOUNT_DELETED,
      })
      dispatch(setAlert('your acount has been permanantly ','danger'))
 
     
   } catch (error) {
     dispatch({
       type:PROFILE_ERROR,
       payload:{
           msg:error.response.statusText,
           status:error.response.status
       }
   })
   }
   }

}


