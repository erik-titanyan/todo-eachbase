import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './pages/Home'
import Login from './pages/Login';
import Register from './pages/Register';
import PrivateRoute from './components/router/PrivateRoute'

const App = () => {

  

  return (
    <Router>
      <Switch>
        <PrivateRoute component={Home} exact path='/'  />
        <Route exact path='/login' component={Login} />
        <Route exact path='/register'  component={Register} />
      </Switch>
      <div id='toast'></div>
    </Router>
  );
}

export default App;
