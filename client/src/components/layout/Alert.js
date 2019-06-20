import React,{Fragment} from 'react'
import PropTypes from 'prop-types'
import {connect } from 'react-redux'

const Alert = ({alerts}) => alerts !== null && alerts.length > 0 && alerts.map(alert=>(
    <Fragment key={alert.id} classNme={`alert alert-${alert.alert.Type}`}>
    {alert.msg}
    </Fragment>
))

Alert.propTypes = {
  alerts:PropTypes.array.isRequired
}

const mapStatetoProps=state=>({
    
    alerts:state.alert
})

export default connect(mapStatetoProps)(Alert)
