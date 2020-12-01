import { CHANGE_TODAY_TVS, CHANGE_LATEST_TVS, CHANGE_HOT_TVS, CHANGE_POPULAR_TVS, CHANGE_TOPRATED_TVS, CHANGE_SEARCH_TVS } from './constants'
import { Map } from 'immutable'

const initialState = Map({
  today_tvs: [],
  latest_tvs: [],
  hot_tvs: [],
  popular_tvs: [],
  toprated_tvs: [],
  search_tvs: []
})

const tvReducer = (state = initialState, action) => {
  switch (action.type) {
    case CHANGE_TODAY_TVS:
      return state.set("today_tvs", action.tvs)
    case CHANGE_LATEST_TVS:
      return state.set("latest_tvs", action.tvs)
    case CHANGE_HOT_TVS:
      return state.set("hot_tvs", action.tvs)
    case CHANGE_POPULAR_TVS:
      return state.set("popular_tvs", action.tvs)
    case CHANGE_TOPRATED_TVS:
      return state.set("toprated_tvs", action.tvs)
    case CHANGE_SEARCH_TVS:
      return state.set("search_tvs", action.tvs)
    default:
      return state
  }
}

export default tvReducer