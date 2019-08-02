import React , {Fragment,useEffect }from 'react';
import './App.css';
import Navbar from './components/layouts/Navbar'
import Landing from './components/layouts/Landing'
import Profile from './components/profile/Profile'
import CreateProfile from './components/forms/CreateProfile'
import EditProfile from './components/forms/EditProfile'
 import Login from './components/auth/Login'
 import Register from './components/auth/Register'
 import {BrowserRouter as Router,Route,Switch} from 'react-router-dom'
 import Alert from './components/layouts/Alert'
 import Dashboard from './components/dashboard/Dashboard'
 import {LoadUser} from './action/auth'
 import PrivateRoute from './components/router/PrivateRoute'
 import Addexperience from './components/forms/Addexperience'
 import Addeducation from './components/forms/Addeducation'
import Profiles from './components/profiles/Profiles'
 import setAuthToken from './utils/setAuthToken'
 import {Provider} from 'react-redux'
 import store from './store'
 import Posts from './components/posts/Posts'
 import Post from './components/post/Post'

 
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
      <PrivateRoute  path="/edit-profile" component={EditProfile}/>
      <Route  path="/profiles" component={Profiles}/>
      <Route  path="/profile/:id" component={Profile}/>
      <PrivateRoute  path="/dashboard" component={Dashboard}/>
      <PrivateRoute  path="/add-experience" component={Addexperience}/>
      <PrivateRoute  path="/add-education" component={Addeducation}/>
      <PrivateRoute  path="/posts" component={Posts}/>
      <PrivateRoute  path="/post/:id" component={Post}/>


      </Switch>
      </section>
    </Fragment>
    </Router>
    </Provider>
  
  );
}

export default App;
