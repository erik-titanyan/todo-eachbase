import React, { useEffect,  useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Cards from './components/Cards';
import Loader from './components/Loader';
import { setToast } from './utils/useToast';
import { getData, addTodo, deleteTodo, clearReducer } from './redux/Actions'

const App = () => { 
  const dispatch = useDispatch()
  const todos = useSelector(state => state.todo.todos)
  const loading = useSelector(state => state.loading.loading)
  const [disabled, setdisabled] = useState(false);

  useEffect(() => {
    dispatch(getData())
  }, [dispatch]);

  const deleteAllHandler = () => {
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
      <div id='toast'></div>
    </div>

  );
}

export default App;
