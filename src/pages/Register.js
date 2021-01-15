import React from 'react';
import {Link} from 'react-router-dom'
import WithAuth from '../hoc/auth.hoc';

const Register = ({ statusBtn, handleChange, handleSubmit}) => {
  
  
  return (
    <div className='register-box'>
      <div className='box-header'>
        <h1>Please register</h1>
      </div>
      <form onSubmit={handleSubmit}>
          <input type='text' name='name' placeholder='name' onChange={e => handleChange(e)}/>
          <input type='text' name='email' placeholder='email' onChange={e => handleChange(e)} />
          <input type='password' name='password' placeholder='password' onChange={e => handleChange(e)} />
          <input type='submit' disabled={statusBtn} value='register'/>
      </form>
      <p>Already have an account? <Link to='/login'>Login</Link> </p>
    </div>
  );
}

export default WithAuth(Register);
