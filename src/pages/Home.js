import React, { useCallback, useEffect,  useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Cards from '../components/Cards';
import Loader from '../components/Loader';
import { setToast } from '../utils/useToast';
import { getData, addTodo, deleteTodo, clearReducer, logout } from '../redux/Actions'
import { useHistory } from 'react-router-dom';

const Home = () => { 
  const dispatch = useDispatch()
  const todos = useSelector(state => state.todo.todos)
  const history = useHistory()
  const loading = useSelector(state => state.loading.loading)
  const [disabled, setdisabled] = useState(false);

  const logOutHandler = useCallback(() => {
    dispatch(logout())
    history.push('/login')
  }, [dispatch, history])

  const getTodos = useCallback( async () => {
    try {
      await dispatch(getData())
    } catch (e) {
      if(e.message === "Unauthorized user") {
          logOutHandler()
        }
    }
  }, [dispatch, logOutHandler]) 

  useEffect( () => {
    getTodos()
   }, [getTodos]);

  

  const deleteAllHandler = () => {
    try {
      if(!todos.length) {
        return setToast('Nothing to clear')
      }
  
      todos.forEach(i => {
        if(i._id === 'newOne') {
          setdisabled(false)
          return
        }
  
        dispatch(deleteTodo(i._id))    
      })
  
      dispatch(clearReducer())
     
    } catch (e) {}
    
  }
  
  return (
    <div className="container">
      <div className="header-container">
        <h1>Todo Tasks</h1>
        <div className="header-button-container">
          <button className="add-button" disabled={disabled}  onClick={() => {
            dispatch(addTodo())
            setdisabled(true)
            }}>
            <i className="material-icons header-icons">add_circle</i>
          </button>
          <button className='delete-all-btn' onClick={deleteAllHandler}>
            <i className='material-icons header-icons'>delete_forever</i>
          </button>
          <button className='log-out-btn' onClick={logOutHandler}>
            <i className='material-icons header-icons'>exit_to_app</i>
          </button>
        </div>
      </div>
      <div className='card-container'>
        {loading ? <Loader/> :
          !todos.length ? 
          <div className='info-message'>
            <p>Add some todos by clicking in plus button</p>
          </div> :
          <Cards todos={todos} toggle={(toggleButton) => {
            setdisabled(toggleButton)}
          }/>
           
        }
      </div>
    </div>

  );
}

export default Home;
