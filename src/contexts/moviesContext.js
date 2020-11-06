import React, { useEffect, useReducer } from 'react'
import { getMovies } from '../api/tmdb-api'

export const MoviesContext = React.createContext(null)

const initialState = {
  movies: []
}
const reducer = (state, action) => {
  switch (action.type) {
    case "add-favorite":
      return {
        movies: state.movies.map((movie, index) => {
          return movie.id === action.payload.movie.id ? { ...movie, favorite: true } : movie
        })
      }
    case "load":
      return { movies: action.payload.movies }
    case "add-review":
      break;
    default:
      return state
  }
}

// wrap the value in one Function
const MoviesContextProvider = props => {

  const [state, dispatch] = useReducer(reducer, initialState)

  const addToFavorites = (movieId) => {
    const index = state.movies.map(m => m.id).indexOf(movieId)
    dispatch({ type: 'add-favorite', payload: { movie: state.movies[index] } })
  }

  const addReview = (movie, review) => {

  }

  useEffect(() => {
    getMovies().then(movies => {
      dispatch({type: 'load', payload: {movies}})
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  return (
    <MoviesContext.Provider
      value={{
        movies: state.movies,
        addToFavorites: addToFavorites,
        addReview: addReview
      }}>
      {props.children}
    </MoviesContext.Provider>
  )
}

export default MoviesContextProvider