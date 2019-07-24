import React,{useEffect,Fragment} from 'react'
import {connect} from 'react-redux'
import {getCurrentProfile} from '../../action/profile'
import Spinner from '../layout/Spinner'
import PropTypes from 'prop-types'
import {Link} from 'react-router-dom'
import {store} from 'react-redux'


const Dashboard = ({getCurrentProfile,auth:{user},profile:{loading,profile}}) => {

    useEffect(()=>{
         getCurrentProfile()
      },[])
    return loading && profile == null ? <Spinner /> : 
      <Fragment> 
      <h1 className="large text-primary">Dashboard</h1>
      <p className="lead">
      <i className="fas fa-user"></i> Welcome {user && user.name} 
      </p>
      {profile !== null ? <Fragment>has</Fragment>:<Fragment>
    
      <p> You Have not yet Set up a profile, please add some info </p>
      <Link to="/create-profile" className="btn btn-primary my-1">Create Profile</Link>
     
      </Fragment>}
      
    
    </Fragment>
}

Dashboard.propTypes={
    getCurrentProfile:PropTypes.func.isRequired,
    auth:PropTypes.object.isRequired,
    profile:PropTypes.object.isRequired

}

const map=state=>({
    profile:state.profile,
    auth:state.auth
})

export default connect(map,{getCurrentProfile})(Dashboard)
