import React,{Fragment} from 'react'
import spinner from '../../img/spinner.gif'

const Spinner = () => {
    return (
        <Fragment>
         <img src={spinner} 
         style={{width:'200px',margin:'auto',dispaly:'block'}}
         alt=""
         />
        </Fragment>    
    )}

export default Spinner
