import React from 'react';
import { setToast } from '../utils/useToast';


const WithValidation = (WrappedComponent) => {
  const WithValidationWrapper = () => {
    function isValid (data) {
      const errors = []

      Object.keys(data).forEach(i => {
        if(data[i] === '') {
          errors.push(`${i} is required`)
        }
        
        if(i === "email" && data[i]) {
          const regexp = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
          (regexp.test(String(data[i]).toLowerCase()) === false) &&  errors.push('Invalid email')
        }
    
        if(i === 'password' && data[i]) {
          const minLength = 6
          data[i].length < minLength && errors.push(`Password must have ${minLength} charachters at least`) 
        }
      })
      if(errors.length) {
        const message = errors.join('<br/>')
        setToast(message, false)
        return false
      }
      return true
    }

    return <WrappedComponent isValid={isValid} />
  }

  return WithValidationWrapper
}

export default WithValidation