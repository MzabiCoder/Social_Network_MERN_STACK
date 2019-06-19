import React , {Fragment} from 'react';
import './App.css';
import Navbar from './components/Navbar'
import Landing from './components/Landing'
import Login from './components/auth/Login'
import Register from './components/auth/Register'
import {BrowserRouter as Router,Route,Switch} from 'react-router-dom'

const App=()=> {
  return (
    <Router>
    <Fragment>
      <Navbar/>
      <Route exact={true} path="/" component={Landing}/>
      <section className="container">
      <Switch>
      <Route exact path="/register" component={Register}/>
      <Route exact path="/login" component={Login}/>
      </Switch>
      </section>
      <Landing/>
    </Fragment>
    </Router>
  );
}

export default App;
