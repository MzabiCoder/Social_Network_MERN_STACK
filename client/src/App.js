import React , {Fragment,useEffect} from 'react';
import './App.css';
import Navbar from './components/Navbar'
import Landing from './components/Landing'
import Dashboard from './components/dashboard/Dashboard'
import Login from './components/auth/Login'
import Register from './components/auth/Register'
import {BrowserRouter as Router,Route,Switch} from 'react-router-dom'
import Alert from './components/layout/Alert'
import PrivateRoute from  './components/routing/PrivateRoute'
import {LoadUser} from './action/auth'
import setAuthToken from './utils/setAuthToken'
import {Provider} from 'react-redux'

import store from './store'
if (localStorage.token){
  setAuthToken(localStorage.token)
}
const App=()=> {


    useEffect(()=>{
      store.dispatch(LoadUser())
    },[])
  return (
    <Provider store={store}>    
    <Router>
    <Fragment>
      <Navbar/>
      <Route exact path='/' component={Landing}/>
      <section className="container">
      <Alert />
      <Switch>
      <Route  path='/register' component={Register}/>
      <Route  path='/login' component={Login}/>
      <Route  path='/dashboard' component={Dashboard}/>
      </Switch>
      </section>
     
    </Fragment>
    </Router>
    </Provider> 
  );
}

export default App;
