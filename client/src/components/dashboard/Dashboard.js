import React,{useEffect} from 'react'
import {connect} from 'react-redux'
import {getCurrentProfile} from '../../action/profile'
import PropTypes from 'prop-types'
import {store} from 'react-redux'

const Dashboard = ({getCurrentProfile,auth,profile}) => {

    useEffect(()=>{
         getCurrentProfile()
      },[])
    return (
        <div>
       <h1>Hellow form dashboard</h1>
        </div>
    )
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
