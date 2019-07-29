import {PROFILE_ERROR,GET_PROFILE,CLEAR_PROFILE} from '../action/types'
const Istate={
    profile:null,
    profiles:[],
    repos:[],
    laoding:true,
    errors:{}
}


export default function(state=Istate,action){
    const {type,payload}=action
    switch(type){
        case GET_PROFILE:
            return{
                ...state,
                profile:payload,
                loading:false
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