import { CHANGE_TODAY_TVS, CHANGE_LATEST_TVS, CHANGE_HOT_TVS, CHANGE_TODAY_TVS_BY_SORT } from './constants'
import { Map } from 'immutable'

const initialState = Map({
  today_tvs: [],
  latest_tvs: [],
  hot_tvs: []
})

const tvReducer = (state = initialState, action) => {
  switch (action.type) {
    case CHANGE_TODAY_TVS:
      return state.set("today_tvs", action.tvs)
    case CHANGE_LATEST_TVS:
      return state.set("latest_tvs", action.tvs)
    case CHANGE_HOT_TVS:
      return state.set("hot_tvs", action.tvs)
    case CHANGE_TODAY_TVS_BY_SORT:
      return state.set("today_tvs", action.tvs)
    default:
      return state
  }
}

export default tvReducer