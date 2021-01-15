import React from 'react';
import { Redirect, Route } from 'react-router-dom';


const PrivateRoute = ({component: Component, exact, path}) => {
  
  
  return (
    <Route 
      path={path}
      exact={exact}
      render={props =>
        localStorage.getItem('userData') 
          ? <Component {...props}  />
          : <Redirect to='/login' />
          }
        />
  )
}



export default PrivateRoute