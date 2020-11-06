import React, {memo, useContext} from "react";
import AddToFavoriteButton from "../components/buttons/addToFavorites";
import PageTemplate from "../components/templateMovieListPage";
import {MoviesContext} from '../contexts/moviesContext'

const MovieListPage = () => {

  // use the useContext hook
  const {movies} = useContext(MoviesContext)

  return (
    <>
      <PageTemplate
        title='No. Movies'
        movies={movies}
        action={(movie) => {
          return <AddToFavoriteButton movie={movie} />
        }}
      />
    </>
  );
};

export default memo(MovieListPage);