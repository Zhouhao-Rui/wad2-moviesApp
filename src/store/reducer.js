import { combineReducers } from 'redux-immutable'
import { reducer as movieReducer } from '../components/movieStore'

const combinedReducer = combineReducers({
  movies: movieReducer
})

export default combinedReducer