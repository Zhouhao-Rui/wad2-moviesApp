import {CHANGE_FAVORITE_MOVIES} from './constants'
import {Map} from 'immutable'

const initialState = Map({
  favorites: []
})

const movieReducer = (state=initialState, action) => {
  switch(action.type) {
    case CHANGE_FAVORITE_MOVIES:
      return state.update("favorites", item => item.concat(action.favorites))
    default:
      return state
  }
}

export default movieReducer