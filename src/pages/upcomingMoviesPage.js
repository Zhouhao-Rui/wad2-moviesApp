import React, { memo, useContext } from 'react'
import PageTemplate from "../components/templateMovieListPage";
import AddWatchList from '../components/buttons/addWatchList';
import { MoviesContext } from '../contexts/moviesContext';

const UpcomingMoviesPage = () => {
  const context = useContext(MoviesContext)

  const movies = context.upcoming.filter((m) => {
    return !("movieList" in m)
  })

  return (
    <PageTemplate
      title='Upcoming Movies'
      movies={movies}
      action={(movie => (
        <AddWatchList movie={movie} />
      ))}
      handleNavigation={context.upcomingNavigation}
    />
  )
}

export default memo(UpcomingMoviesPage)