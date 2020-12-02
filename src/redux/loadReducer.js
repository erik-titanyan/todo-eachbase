const { SHOW_LOADER, HIDE_LOADER } = require("./types")

const initilaState = {
  loading: false
}

export const loadReducer = (state = initilaState, action) => {
  switch (action.type) {
    case SHOW_LOADER: return {loading: true}
    case HIDE_LOADER: return {loading: false}
    default: return state
  }
}