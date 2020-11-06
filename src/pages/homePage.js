import React, {memo, useContext} from "react";
import PageTemplate from "../components/templateMovieListPage";
import {MoviesContext} from '../contexts/moviesContext'

const MovieListPage = () => {

  // use the useContext hook
  const {movies, addToFavorites} = useContext(MoviesContext)

  return (
    <>
      <PageTemplate
        title='No. Movies'
        movies={movies}
        buttonHandler={addToFavorites}
      />
    </>
  );
};

export default memo(MovieListPage);