import React , {Fragment,useEffect }from 'react';
import './App.css';
import Navbar from './components/layouts/Navbar'
import Landing from './components/layouts/Landing'
// import Dashboard from './components/dashboard/Dashboard'
import CreateProfile from './components/forms/CreateProfile'
 import Login from './components/auth/Login'
 import Register from './components/auth/Register'
 import {BrowserRouter as Router,Route,Switch} from 'react-router-dom'
 import Alert from './components/layouts/Alert'
 import Dashboard from './components/dashboard/Dashboard'
 import {LoadUser} from './action/auth'
 import PrivateRoute from './components/router/PrivateRoute'
// import PrivateRoute from  './components/routing/PrivateRoute'
// import CreateProfile from './components/profile-forms/CreateProfile'
// import {LoadUser} from './action/auth'
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
     <Route exact path="/" component={Landing}/>
      <section className="container">
      <Alert />
      <Switch>
      <Route  path="/register" component={Register}/>
      <Route  path="/login" component={Login}/>
      <PrivateRoute  path="/create-profile" component={CreateProfile}/>
      <PrivateRoute  path="/dashboard" component={Dashboard}/>
      </Switch>
      </section>
    </Fragment>
    </Router>
    </Provider>
  
  );
}

export default App;
