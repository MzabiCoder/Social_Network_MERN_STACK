import React,{useEffect,Fragment} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {getCurrentProfile} from '../../action/profile'
import Spinner from '../layouts/Spinner'
import {Link} from 'react-router-dom'
import DashboardAction from './DashboardAction'

const Dashboard = ({auth:{user},profile:{profile,loading},getCurrentProfile}) => {
    useEffect(()=>{
        getCurrentProfile()
    },[])
    return loading && profile === null ? <Spinner /> :<Fragment>
    
      <h1 className="large text-primar">Dashboard</h1>
        <p className="lead">
        <i className="fas fa-user">Welcome {user && user.name}</i>
        </p>

         {profile !== null ? (<Fragment>
            <DashboardAction/>
            
            </Fragment>) : (<Fragment>
            <p>You have not setup a profile add some info</p>
            <Link to="/create-profile" className="btn btn-primary">
            Create Profile
            </Link>
            
            
            </Fragment>)}
    
    </Fragment>
}
    

Dashboard.propTypes = {
    getCurrentProfile:PropTypes.func.isRequired,
    auth:PropTypes.object.isRequired,
    profile:PropTypes.object.isRequired
}

const map=state=>({
auth:state.auth,
profile:state.profile
})

export default connect(map,{getCurrentProfile})(Dashboard)
