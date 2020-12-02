import { setHexColStr } from '../utils/useHexColStr'
import { useHttp } from '../utils/useHttp'
import { setToast } from '../utils/useToast'
import { 
  ADD_TODO, CLEAR_REDUCER, CREATE_TODO, DELETE_TODO, 
  HIDE_LOADER, SET_TODOS, SHOW_LOADER, UPDATE_TODO
 } from './types'


// eslint-disable-next-line react-hooks/rules-of-hooks
const {request} = useHttp()
const baseUrl = 'https://todo.eachbase.com/api/ErikTitanyan/todos/'

export const showLoader = () => {
  return {
    type: SHOW_LOADER,
  }
}

export const hideLoader = () => {
  return {
    type: HIDE_LOADER,
  }
}

export const clearReducer = () => {
  return {
    type: CLEAR_REDUCER
  }
}

export const addTodo = () => {
  return {
    type: ADD_TODO,
    payload: {title: '', description: '', color: 'f7fda0',  _id: 'newOne'}
  }
}

export const getData =  () => {
  return async dispatch => {
      try {
        dispatch(showLoader())
        
        const res = await request(baseUrl)

        res.forEach(i => {
          i.textColor = setHexColStr(i.color)
        });
        
        dispatch({type: SET_TODOS, payload: res.reverse()})

        dispatch(hideLoader())
      } catch (e) {}
  }
}

export const createTodo = (data) => {
  return async (dispatch) => {
    try {
      const res = await request(baseUrl, 'POST', data )
     
      res.textColor = setHexColStr(res.color)

      dispatch({type: CREATE_TODO, payload: res}) 

      setToast('Created successfully', true)
    } catch (e) {}
  }
}

export const updateTodo = (data, id) => {
  return async dispatch => {
    try {
      const res = await request(baseUrl + id, 'PATCH', data )

      res.textColor = setHexColStr(res.color)

      dispatch({type: UPDATE_TODO, payload: res})

      setToast('Updated successfully', true)
    } catch (e) {}      
  }
}

export const deleteTodo = (id) => {
  return async dispatch => {
    try {
      if(id === 'newOne') {
         dispatch({type: DELETE_TODO, payload: id})
         return
      }

      await request(baseUrl + id, 'DELETE') 
      
      dispatch({type: DELETE_TODO, payload: id})
    } catch (e) {}
  }
}