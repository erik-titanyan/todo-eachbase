import { combineReducers } from "redux"
import { todoReducer } from "./todoReducer"
import { loadReducer } from "./loadReducer"
import { RESET_REDUCERS } from "./types"



const appReducer = combineReducers({
  todo: todoReducer, loading: loadReducer
})

export const rootReducer = (state, action) => {
  if(action.type === RESET_REDUCERS) {
      state = undefined
  }
  return appReducer(state, action)
}
