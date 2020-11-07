import React, { memo, useEffect, useState, useContext } from 'react'
import PageTemplate from "../components/templateMovieListPage";
import AddWatchList from '../components/buttons/addWatchList';
import { MoviesContext } from '../contexts/moviesContext';

const UpcomingMoviesPage = () => {
  const context = useContext(MoviesContext)

  return (
    <PageTemplate
      title='Upcoming Movies'
      movies={context.upcoming}
      action={(movie => (
        <AddWatchList movie={movie} />
      ))}
    />
  )
}

export default memo(UpcomingMoviesPage)