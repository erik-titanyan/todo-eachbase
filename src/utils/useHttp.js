import { setToast } from "./useToast"

export const useHttp = () => {


  const request = async (url, method = "GET", body = null, headers = {}) => {
    try {
      if(body) {
        body = JSON.stringify(body)
        headers['Content-type'] = 'application/json'
      }

      const userData = JSON.parse(localStorage.getItem('userData')) || null 

      if(userData) {
        headers['Authorization'] = `Bearer ${userData.token}`
      }
  
      const res = await fetch(url, {method, body, headers})
      
      const data = await res.json()

      if(!res.ok) {
        throw new Error(data.message || 'something went wrong') 
      }

      return data

    } catch (e) {
      setToast(e.message || 'Something went wrong') 
      throw e
    }
    
  }

  return { request }
}
