export const getMovies = (page) => {
  return fetch(
    `https://api.themoviedb.org/3/discover/movie?api_key=${process.env.REACT_APP_TMDB_KEY}&language=en-US&include_adult=false&page=${page}`
  )
    .then(res => res.json())
    .then(json => json.results);
};

export const getMovie = id => {
  return fetch(
    `https://api.themoviedb.org/3/movie/${id}?api_key=${process.env.REACT_APP_TMDB_KEY}`
  ).then(res => res.json());
};

export const getGenres = () => {
  return fetch(
    `https://api.themoviedb.org/3/genre/movie/list?api_key=${process.env.REACT_APP_TMDB_KEY}&language=en-US`
  )
  .then(res => res.json())
  .then(json => json.genres);
};

export const getMovieReviews = id => {
  return fetch(
    `https://api.themoviedb.org/3/movie/${id}/reviews?api_key=${process.env.REACT_APP_TMDB_KEY}`
  )
  .then(res => res.json())
  .then(json => json.results)
}

export const getUpcomingMovies = (page) => {
  return fetch(
    `https://api.themoviedb.org/3/movie/upcoming?api_key=${process.env.REACT_APP_TMDB_KEY}&language=en-US&page=${page}`
  )
  .then(res => res.json())
  .then(json => json.results)
}

export const searchMedia = (query_string) => {
  return fetch(
    `https://api.themoviedb.org/3/search/movie?api_key=${process.env.REACT_APP_TMDB_KEY}&language=en-us&query=${query_string}&page=1&include_adult=false`
  )
  .then(res => res.json())
  .then(json => json.results)
}

export const getTodayTvs = (page) => {
  return fetch(
    `https://api.themoviedb.org/3/tv/airing_today?api_key=${process.env.REACT_APP_TMDB_KEY}&language=en-US&page=${page}`
  )
  .then(res => res.json())
  .then(json => json.results)
}

export const getLatestTVs = () => {
  return fetch(
    `https://api.themoviedb.org/3/tv/latest?api_key=${process.env.REACT_APP_TMDB_KEY}&language=en-US`
  )
  .then(res => res.json())
}

export const getHotTVs = () => {
  return fetch(
    `https://api.themoviedb.org/3/tv/on_the_air?api_key=${process.env.REACT_APP_TMDB_KEY}&language=en-US&page=1`
  )
  .then(res => res.json())
  .then(json => json.results)
}