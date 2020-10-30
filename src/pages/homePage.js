import React, {memo, useEffect, useState} from "react";
import Header from "../components/headerMovieList";
import MovieList from "../components/movieList";
import FilterControls from "../components/filterControls";

const MovieListPage = () => {
  const [titleFilter, setTitleFilter] = useState("")
  const [genreFilter, setGenreFilter] = useState("0")

  const [movies, setmovies] = useState([])

  useEffect(() => {
    fetch(`https://api.themoviedb.org/3/discover/movie?api_key=${process.env.REACT_APP_TMDB_KEY}&language=en-US&include_adult=false&page=1`)
    .then(res => res.json())
    .then(json => {
      console.log(json)
      return json.results
    })
    .then(movies => {
      setmovies(movies)
    })
  }, [])

  const genre = Number(genreFilter)
  let displayedMovies = movies
  .filter(movie => {
    return movie.title.toLowerCase().search(titleFilter.toLowerCase()) !== -1
  })
  .filter(movie => {
    // on default, it will include the genre
    return genre > 0 ? movie.genre_ids.includes(Number(genreFilter)) : true
  })

  // Both of the children components should use the filter function
  // so we need the child component to give the value to the parent compnent
  // we write the property onUserInput and get the user type
  const handleFilterChange = (type, value) => {
    if (type === "name") setTitleFilter(value);
    else setGenreFilter(value);
  };

  return (
    <>
      <Header numMovies={displayedMovies.length} />
      <FilterControls onUserInput={handleFilterChange} />
      <MovieList movies={displayedMovies} />
    </>
  );
};

export default memo(MovieListPage);