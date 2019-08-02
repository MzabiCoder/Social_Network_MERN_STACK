import axios from 'axios'
import {GET_POSTS,POST_ERROR,UPDATE_LIKES,DELETE_POST,ADD_POST,GET_POST,ADD_COMMENT,REMOVE_COMMENT} from './types'
import {setAlert} from '../action/alert'


// get all posts

export const getPosts=()=>async dispatch=>{
try {

    const res=await axios.get('/api/posts')
    dispatch({
        type:GET_POSTS,
        payload:res.data
    })
    
} catch (error) {
    dispatch({
        type:POST_ERROR,
        payload:{
            msg:error.response.statusText,
            status:error.response.status
        }
    })
}
}

// update likes 


export const addLike=(id)=>async dispatch=>{
    try {
    
        const res=await axios.put(`/api/posts/like/${id}`)
        dispatch({
            type:UPDATE_LIKES,
            payload:{id,likes:res.data}
        })
        
    } catch (error) {
        dispatch({
            type:POST_ERROR,
            payload:{
                msg:error.response.statusText,
                status:error.response.status
            }
        })
    }
    }

    
export const removeLike=(id)=>async dispatch=>{
    try {
    
        const res=await axios.put(`/api/posts/unlike/${id}`)
        dispatch({
            type:UPDATE_LIKES,
            payload:{id,likes:res.data}
        })
        
    } catch (error) {
        dispatch({
            type:POST_ERROR,
            payload:{
                msg:error.response.statusText,
                status:error.response.status
            }
        })
    }
    }

    export const delPost=(id)=>async dispatch=>{
        try {
        
            const res=await axios.delete(`/api/posts/${id}`)
            dispatch({
                type:DELETE_POST,
                payload:{id,likes:res.data}
            })

            dispatch(setAlert('Post has been deleted','danger'))
            
        } catch (error) {
            dispatch({
                type:POST_ERROR,
                payload:{
                    msg:error.response.statusText,
                    status:error.response.status
                }
            })
        }
        }

        
    export const addPost=formData=>async dispatch=>{
        const config={
            headers:{
              'Content-Type':'application/json'
            }
          }
        try {
        
            const res=await axios.post(`/api/posts`,formData,config)
            dispatch({
                type:ADD_POST,
                payload:res.data
            })

            dispatch(setAlert('Post created !!','success'))

            
        } catch (error) {
            dispatch({
                type:POST_ERROR,
                payload:{
                    msg:error.response.statusText,
                    status:error.response.status
                }
            })
        }
        }

        // single post

        export const getPost=(id)=>async dispatch=>{
            try {
            
                const res=await axios.get(`/api/posts/${id}`)
                dispatch({
                    type:GET_POST,
                    payload:res.data
                })
                
            } catch (error) {
                dispatch({
                    type:POST_ERROR,
                    payload:{
                        msg:error.response.statusText,
                        status:error.response.status
                    }
                })
            }
            }


      //add comment

      export const addComment=(postId,formData)=>async dispatch=>{
        const config={
            headers:{
              'Content-Type':'application/json'
            }
          }
        try {
        
            const res=await axios.post(`/api/posts/comment/${postId}`,formData,config)
            dispatch({
                type:ADD_COMMENT,
                payload:res.data
            })

            dispatch(setAlert('COmmentt added created !!','success'))

            
        } catch (error) {
            dispatch({
                type:POST_ERROR,
                payload:{
                    msg:error.response.statusText,
                    status:error.response.status
                }
            })
        }
        }

        export const delComment=(postId,CommentId)=>async dispatch=>{
        
            try {
            
                const res=await axios.delete(`/api/posts/comment/${postId}/${CommentId}`)
                dispatch({
                    type:REMOVE_COMMENT,
                    payload:CommentId
                })
    
                dispatch(setAlert('Commentt removed !!','success'))
    
                
            } catch (error) {
                dispatch({
                    type:POST_ERROR,
                    payload:{
                        msg:error.response.statusText,
                        status:error.response.status
                    }
                })
            }
            }