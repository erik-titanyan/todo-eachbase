import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import WithValidation from './validation.hoc';
import {register, login} from '../redux/Actions'
import { useHistory } from 'react-router-dom';

const WithAuth = (WrappedComponent) => {
  const WithAuthWrapper = ({isValid}) => {
  const dispatch = useDispatch()
  const history = useHistory()
  const [userData, setUserData] = useState({email: '', password: '', name: ''})
  const [statusBtn, setStatusBtn] = useState(false);

  const handleChange = (e) => {
    setUserData({...userData, [e.target.name]: e.target.value})
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      
      setStatusBtn(true) 

      const valid = isValid(userData)

      if(!valid) {
        return setStatusBtn(false)
      }

      if(userData.name) {
          await dispatch(register(userData))
          history.push('/login')
      } else {
          await dispatch(login(userData))
          history.push('/') 
      }
      
      
    } catch (e) {
      setStatusBtn(false)
    }
  }

  return (
        <WrappedComponent 
          userData={userData}
          statusBtn={statusBtn}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
          />
  )
  }

  return WithValidation(WithAuthWrapper)
}

export default WithAuth