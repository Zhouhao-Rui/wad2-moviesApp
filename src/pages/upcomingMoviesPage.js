import React, { memo, useEffect, useState, useContext } from 'react'
import PageTemplate from "../components/templateMovieListPage";
import AddToFavoriteButton from "../components/buttons/addToFavorites";
import { getUpcomingMovies } from '../api/tmdb-api'
import AddWatchList from '../components/buttons/addWatchList';

const UpcomingMoviesPage = () => {
  const [movies, setMovies] = useState([])
  useEffect(() => {
    getUpcomingMovies().then(res => {
      setMovies(res)
    })
  }, [])

  return (
    <PageTemplate
      title='Upcoming Movies'
      movies={movies}
      action={(movie => (
        <AddWatchList movie={movie} />
      ))}
    />
  )
}

export default memo(UpcomingMoviesPage)