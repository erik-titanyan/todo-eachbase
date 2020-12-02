import React, { useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { createTodo, deleteTodo, updateTodo } from '../redux/Actions';
import { setToast } from '../utils/useToast';

const Form = ({todo, btnToggle}) => {

  const dispatch = useDispatch()

  const ref = useRef()

  const [form, setForm] = useState({
    title: todo.title, 
    description: todo.description, 
    color: todo.color
  });

  
  const changeHandler = (event) => {
    ref.current.style.visibility = 'visible'
  
    setForm({...form, [event.target.name]: event.target.value})
  }

  const deleteTodoHandler = () => {
    if(todo._id === 'newOne') {
      btnToggle(false)
    }
    dispatch(deleteTodo(todo._id))
  }
  
  const submitHandler = (event) => {
    event.preventDefault()

    if(!form.title || !form.description) {
      return setToast('Please fill all fields')
    }

    if( todo._id === 'newOne' ) {
      dispatch(createTodo(form))
      btnToggle(false)
      ref.current.style.visibility = 'hidden'
      return
    }

    dispatch(updateTodo(form, todo._id))

    ref.current.style.visibility = 'hidden'
  }

  return (
    <div className="sticky-note" style={{backgroundColor: todo.color}}> 

      <div className='delete-button' 
        onClick={deleteTodoHandler}>
        <div className="delete-icon-abs">
            <i className='material-icons card-icon' aria-hidden="true">
              cancel
            </i>
        </div>
      </div>
      <form onSubmit={submitHandler}>
        <input type="text" placeholder="Fill the title"
          className="title" defaultValue={todo.title}
          name='title' style={{color: todo.textColor}}
          onChange={changeHandler}
        />
        <textarea placeholder="Description..." className="description" 
          defaultValue={todo.description} name='description'
          onChange={changeHandler} style={{color: todo.textColor}}
        />
        <div className='buttons-container'>
          <button type='submit' className='submit-button' ref={ref}
            name='submit-btn' style={{visibility: 'hidden'}}>
            <i className='material-icons card-icon' aria-hidden="true">check</i>
          </button>
          <button type='button' className='color-button' 
            onClick={() => document.getElementById('color-input' + todo._id).click()}
          >
            <i className='material-icons card-icon' aria-hidden="true">
              color_lens
            </i>
          </button>
            <input type='color' defaultValue={todo.color} name='color' 
              id={'color-input' + todo._id} className='input-field' 
              onChange={changeHandler}
            />
        </div>  
      </form>
  </div>
  )
}

export default Form