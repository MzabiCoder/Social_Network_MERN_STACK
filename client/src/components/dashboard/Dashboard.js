import React,{useEffect,Fragment} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {getCurrentProfile} from '../../action/profile'
import Spinner from '../layouts/Spinner'
import {Link} from 'react-router-dom'
import DashboardAction from './DashboardAction'
import Experience  from './Experience'
import Education from './Education'
import {delteAcc} from '../../action/profile'

const Dashboard = ({auth:{user},profile:{profile,loading},getCurrentProfile,delteAcc}) => {
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
            <Experience experience={profile.experience}/>
            <Education education={profile.education}/>
              
             <dir className="my-2">
              <button className="btn btn-danger" onClick={()=>delteAcc()}>
              <i className="fas fa-user-minus"></i>{' '}Delete My Account
              </button>
              </dir>

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
    profile:PropTypes.object.isRequired,
    delteAcc:PropTypes.func.isRequired
}

const map=state=>({
auth:state.auth,
profile:state.profile
})

export default connect(map,{getCurrentProfile,delteAcc})(Dashboard)
