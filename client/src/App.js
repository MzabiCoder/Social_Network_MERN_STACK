import React , {Fragment} from 'react';
import './App.css';
import Navbar from './components/Navbar'
import Landing from './components/Landing'
import Login from './components/auth/Login'
import Register from './components/auth/Register'
import {BrowserRouter as Router,Route,Switch} from 'react-router-dom'
import Alert from './components/layout/Alert'

import {Provider} from 'react-redux'
import store from './store'

const App=()=> {
  return (
    <Provider store={store}>    
    <Router>
    <Fragment>
      <Navbar/>
      <Route exact path="/" component={Landing}/>
      <section className="container">
      <Alert />
      <Switch>
      <Route exact path="/register" component={Register}/>
      <Route exact path="/login" component={Login}/>
      </Switch>
      </section>
      <Landing/>
    </Fragment>
    </Router>
    </Provider> 
  );
}

export default App;
