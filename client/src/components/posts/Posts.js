import React ,{useEffect,Fragment}from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {getPosts} from '../../action/post'
import Spinner from '../layouts/Spinner'
import PostItem from './PostItem'
import PostForm from './PostForm'

const Posts = ({getPosts,post:{posts,loading}}) => {

    useEffect(()=>{
        getPosts()
    },[getPosts])
    return (loading ? <Spinner />:<Fragment>
        
         <h1 className="large text">Posts</h1>
         <p className="lead">
         <i className="fas fa-user"></i>
         Welcom to the community
         </p>
         
         <PostForm />
         <div className="posts">
         {posts.map(post=>(
             <PostItem key={post._id} post={post}/>
         ))}
         </div>

        </Fragment>)
}

Posts.propTypes = {
    getPosts:PropTypes.func.isRequired,
    post:PropTypes.object.isRequired
}

const map=state=>({
    post:state.post
})

export default connect(map,{getPosts})(Posts)
