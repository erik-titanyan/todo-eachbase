import { ADD_TODO, CLEAR_REDUCER, CREATE_TODO, DELETE_TODO, SET_TODOS,  UPDATE_TODO } from "./types"

const initialState = {
  todos: [],
}

export const todoReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TODO: return { todos: [ action.payload, ...state.todos] }
    case CREATE_TODO: const created = [...state.todos]
                    created[0] = action.payload
                    return {todos: created }
    case SET_TODOS: return { todos: action.payload  }
    case UPDATE_TODO: const idx = state.todos.findIndex(i => i._id === action.payload._id)
                      const updated = [...state.todos]
                      updated[idx] = action.payload
                      return { todos: updated }
    case DELETE_TODO: const filteredState = state.todos.filter(i => i._id !== action.payload)
                      return { todos: filteredState }
    case CLEAR_REDUCER: return state = initialState
    default: return state
  }
}