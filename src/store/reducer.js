import { combineReducers } from 'redux-immutable'
import { reducer as movieReducer } from '../components/movieStore'
import { reducer as tvReducer } from '../components/tvStore'

const combinedReducer = combineReducers({
  movies: movieReducer,
  tvs: tvReducer
})

export default combinedReducer