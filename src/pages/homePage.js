import React, {memo, useContext} from "react";
import AddToFavoriteButton from "../components/buttons/addToFavorites";
import PageTemplate from "../components/templateMovieListPage";
import {MoviesContext} from '../contexts/moviesContext'

const MovieListPage = () => {

  // use the useContext hook
  const context = useContext(MoviesContext)
  const movies = context.movies.filter((m) => {
    return !("favorite" in m)
  })

  return (
    <>
      <PageTemplate
        title='No. Movies'
        movies={movies}
        action={(movie) => {
          return <AddToFavoriteButton movie={movie} />
        }}
        handleNavigation={context.homeNavigation}
        type="movie"
      />
    </>
  );
};

export default memo(MovieListPage);