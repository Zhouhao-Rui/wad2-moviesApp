import {CHANGE_FAVORITE_MOVIES} from './constants'

export const changeMoviesAction = (movie) => ({
  type: CHANGE_FAVORITE_MOVIES,
  favorites: movie
})