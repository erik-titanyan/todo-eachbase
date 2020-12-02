import React, { Fragment } from 'react';
import Form from './Form';

const Cards = ({todos, toggle}) => { 
  return (
    <Fragment> 
       {todos.map(todo => {
          return  <Form todo={todo} 
                    btnToggle={data => toggle(data)} 
                    key={todo._id} 
                  /> 
        })}
    </Fragment>
  )
}

export default Cards

