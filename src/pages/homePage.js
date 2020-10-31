import React, {memo, useEffect, useState} from "react";
import PageTemplate from "../components/templateMovieListPage";
import StubAPI from '../api/stubAPI'
import { getMovies } from "../api/tmdb-api";

const MovieListPage = () => {
  const [movies, setmovies] = useState([])

  useEffect(() => {
    getMovies().then(movies => {
      setmovies(movies);
    });
  }, [])

  const addToFavorites = movieId => {
    setmovies(movies => {
      const index = movies.map(m => m.id).indexOf(movieId);
      StubAPI.add(movies[index]);
      let newMoviesState = [...movies]
      newMoviesState.splice(index, 1);
      return newMoviesState;
    });
  }

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