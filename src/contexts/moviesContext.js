import React, { useEffect, useReducer } from 'react'
import { getMovies, getUpcomingMovies } from '../api/tmdb-api'
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import { changeMoviesAction, changeHomePageAction, changeUpcomingPageAction } from '../components/store/actionCreators'

export const MoviesContext = React.createContext(null)

const initialState = {
  movies: [],
  upcoming: []
}
const reducer = (state, action) => {
  switch (action.type) {
    case "add-favorite":
      return {
        movies: state.movies.map((m) =>
          m.id === action.payload.movie.id ? { ...m, favorite: true } : m
        ),
        upcoming: [...state.upcoming],
      };
    case "load":
      return { movies: action.payload.movies, upcoming: [...state.upcoming] };
    case "load-upcoming":
      return { upcoming: action.payload.movies, movies: [...state.movies] };
    case "add-review":
      return {
        movies: state.movies.map((m) =>
          m.id === action.payload.movie.id
            ? { ...m, review: action.payload.review }
            : m
        ),
        upcoming: [...state.upcoming],
      };
    case "add-movieList":
      return {
        upcoming: state.upcoming.map((m) =>
          m.id === action.payload.movie.id
            ? { ...m, movieList: true }
            : m),
        movies: [...state.movies]
      }
    default:
      return state;
  }
}

// wrap the value in one Function
const MoviesContextProvider = props => {

  const {homePage, upcomingPage} = useSelector(state => ({
    homePage: state.getIn(["movies", "homePage"]),
    upcomingPage: state.getIn(["movies", "upcomingPage"])
  }), shallowEqual)

  const Reduxdispatch = useDispatch()

  const [state, dispatch] = useReducer(reducer, initialState)

  const addToFavorites = (movieId) => {
    const index = state.movies.map(m => m.id).indexOf(movieId)
    Reduxdispatch(changeMoviesAction(state.movies[index]))
    dispatch({ type: 'add-favorite', payload: { movie: state.movies[index] } })
  }

  const addReview = (movie, review) => {
    dispatch({ type: "add-review", payload: { movie, review } });
  };

  const addToMovieList = (movieId) => {
    const index = state.upcoming.map(movie => movie.id).indexOf(movieId)
    dispatch({ type: 'add-movieList', payload: { movie: state.upcoming[index] } })
  }

  const getMoviesByPage = (page) => {
    getMovies(page).then(movies => {
      dispatch({ type: 'load', payload: { movies } })
    })
  }

  const getUpcomingMoviesByPage = (page) => {
    getUpcomingMovies(page).then(movies => {
      dispatch({ type: "load-upcoming", payload: { movies } });
    })
  }

  const homeNavigation = (currentPage) => {
    Reduxdispatch(changeHomePageAction(currentPage))
  }

  const upcomingNavigation = (currentPage) => {
    Reduxdispatch(changeUpcomingPageAction(currentPage))
  }

  useEffect(() => {
    getMoviesByPage(homePage)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [homePage]);

  useEffect(() => {
    getUpcomingMoviesByPage(upcomingPage)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [upcomingPage]);

  return (
    <MoviesContext.Provider
      value={{
        movies: state.movies,
        upcoming: state.upcoming,
        addToFavorites: addToFavorites,
        addReview: addReview,
        addToMovieList: addToMovieList,
        homeNavigation: homeNavigation,
        upcomingNavigation: upcomingNavigation,
      }}>
      {props.children}
    </MoviesContext.Provider>
  )
}

export default MoviesContextProvider