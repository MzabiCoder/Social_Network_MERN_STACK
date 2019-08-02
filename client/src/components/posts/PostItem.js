import React ,{Fragment}from 'react'
import PropTypes from 'prop-types'
import {Link} from 'react-router-dom'
import Moment from 'react-moment'
import {connect} from 'react-redux'
import {removeLike,addLike,delPost} from '../../action/post'

const PostItem = ({auth,delPost,removeLike,addLike,post:{
    _id,text,
    name,avatar,
    user,likes,
    showAction,
    comments,date}}) => {
    return (
        <Fragment>
        <div className="post bg-white p-1 my-1">
        <div>
          <Link to={`/profile/${user}`}>
            <img
              className="round-img"
              src={avatar}
              alt=""
            />
            <h4>{name}</h4>
          </Link>
        </div>
        <div>
          <p className="my-1">
           {text}
          </p>
           <p className="post-date">
              Posted on <Moment format="YYYY/MM/DD">{date}</Moment>
          </p>

          {!showAction && <Fragment>
            <button onClick={e=>addLike(_id)} type="button" className="btn btn-light">
            <i className="fas fa-thumbs-up"></i> {'  '}
            <span>{likes.length >0 && (
                <span>{likes.length}</span>

            )}</span>
          </button>
          <button onClick={e=>removeLike(_id)} type="button" className="btn btn-light">
            <i className="fas fa-thumbs-down"></i>
          </button>
          <Link to={`/post/${_id}`} className="btn btn-primary">
            Discussion {comments.length >0 && (
                <span className='comment-count'>{comments.length}</span>

            )}
          </Link>

        
            <button 
            onClick={()=>delPost(_id)}     
            type="button"
            className="btn btn-danger"
          >
            <i className="fas fa-times"></i>
          </button>
            
            </Fragment>}
    
 
        
        </div>
      </div>
        </Fragment>
    )
}

PostItem.defaultProps={
    showAction:true
}

PostItem.propTypes = {
post:PropTypes.object.isRequired,
auth:PropTypes.object.isRequired,
delPost:PropTypes.func.isRequired
}

const map=state=>({
    auth:state.auth
})

export default connect(map,{removeLike,addLike,delPost})(PostItem)
