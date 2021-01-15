import React from 'react';
import {Link} from 'react-router-dom'
import WithAuth from '../hoc/auth.hoc';

const Login = ({ statusBtn, handleChange, handleSubmit, userData}) => {
  
  delete userData.name

  return (
    <div className='register-box'>
      <div className='box-header'>
        <h1>Please login</h1>
      </div>
      <form onSubmit={handleSubmit}>
          <input type='text' placeholder='email' name='email' onChange={e => handleChange(e)}/>
          <input type='password' placeholder='password' name='password' onChange={e => handleChange(e)}/>
          <input type='submit' disabled={statusBtn} value='login' />
      </form>
      <p>Don't have an account? <Link to='/register'>Register</Link> </p>
    </div>
  );
}

export default WithAuth(Login);
