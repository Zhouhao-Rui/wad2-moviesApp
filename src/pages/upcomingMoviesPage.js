import React, {memo, useEffect, useState} from 'react'
import PageTemplate from "../components/templateMovieListPage";
import StubAPI from '../api/stubAPI'
import {getUpcomingMovies} from '../api/tmdb-api'

const UpcomingMoviesPage = () => {
  const [movies, setMovies] = useState([])
  useEffect(() => {
    getUpcomingMovies().then(res => {
      setMovies(res)
    })
  }, [])

  const addToFavorites = movieId => {
    setMovies(movies => {
      const index = movies.map(m => m.id).indexOf(movieId);
      StubAPI.add(movies[index]);
      let newMoviesState = [...movies]
      newMoviesState.splice(index, 1);
      return newMoviesState;
    });
  }

  return (
    <PageTemplate
        title='Upcoming Movies'
        movies={movies}
        buttonHandler={addToFavorites}
      />
  )
}

export default memo(UpcomingMoviesPage)