import {PROFILE_ERROR,GET_REPOS,GET_PROFILE,GET_PROFILES,CLEAR_PROFILE,UPDATE_PROFILE} from '../action/types'
const Istate={
    profile:null,
    profiles:[],
    repos:[],
    loading:true,
    errors:{}
}


export default function(state=Istate,action){
    const {type,payload}=action
    switch(type){
        case GET_PROFILE:
        case UPDATE_PROFILE:    
            return{
                ...state,
                profile:payload,
                loading:false
            }
          case GET_PROFILES:
              return{
                  ...state,
                  profiles:payload,
                  loading:false
              }
           case GET_REPOS:
           return {
               ...state,
               repos:payload,
               loading:false,
           }   
            case PROFILE_ERROR:
                return{
                    ...state,
                    error:payload,
                    loading:false
                }
                case CLEAR_PROFILE:
                    return{
                        ...state,
                        profile:null,
                        repos:[],
                        loading:false
                    }
               default:
                   return state 
    }
}