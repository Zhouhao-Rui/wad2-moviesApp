import { combineReducers } from 'redux-immutable'
import { reducer as movieReducer } from '../components/store'

const combinedReducer = combineReducers({
  movies: movieReducer
})

export default combinedReducer