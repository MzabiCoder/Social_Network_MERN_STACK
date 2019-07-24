import {REGISTER_SUCCESS,REGISTER_FAIL,USER_LOADED,AUTH_ERROR,CLEAR_PROFILE,LOGIN_SUCCESS,LOGIN_FAIL,LOG_OUT} from '../action/types'


const Istate={
    token:localStorage.getItem('token'),
    isAuthenticated:null,
    loading:true,
    user:null
}




export default function (state=Istate,action){

    const { type,payload }=action

   switch(type){
       case USER_LOADED:
           return {
               ...state,
               isAuthenticated:true,
               loading:false,
               user:payload
           }

       
       case REGISTER_SUCCESS:
      case LOGIN_SUCCESS:
       localStorage.setItem('token',payload.token)
       return {
           ...state,
           ...payload,
           isAuthenticated:true,
           loading:false
       }

       case REGISTER_FAIL:
      case LOGIN_FAIL:
     case AUTH_ERROR:
         case LOG_OUT:
       localStorage.removeItem('token')
       return {
           ...state,
           token:null,
           isAuthenticated:false,
           loading:false
       }

       case CLEAR_PROFILE:
           return{
               ...state,
               repos:[],
               profile:null,
               loading:false
           }

       default:
           return state
   }
}