import { CHANGE_TODAY_TVS } from './constants'
import { Map } from 'immutable'

const initialState = Map({
  today_tvs: []
})

const tvReducer = (state = initialState, action) => {
  switch (action.type) {
    case CHANGE_TODAY_TVS:
      return state.set("today_tvs", action.tvs)
    default:
      return state
  }
}

export default tvReducer