import React from 'react';
import './App.css';

import { Router, Switch, Route, Redirect } from 'react-router-dom';
import Register from './Register/Register';
import Login from './Login/Login';
import { history } from "./helpers/history";
import Home from './Home/Home';
import AddData from './Home/AddData';


function App() {

  return (

    <div className="App">

     
      <Router history={history}>

        <Switch>
       
          <Route exact path="/" component={Register} />
          <Route path="/login" component={Login} />
          <Route path="/home" component={Home} />
          <Route path="/data" component={AddData} />


          <Redirect from="*" to="/" />



        </Switch>
      </Router>

    </div>
  );
}

export default App;


