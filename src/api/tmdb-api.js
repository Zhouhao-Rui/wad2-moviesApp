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

export const getPopularTVs = (page) => {
  return fetch(
    `https://api.themoviedb.org/3/tv/popular?api_key=${process.env.REACT_APP_TMDB_KEY}&language=en-US&page=${page}`
  )
  .then(res => res.json())
  .then(json => json.results)
}

export const getTopRatedTVs = (page) => {
  return fetch(
    `https://api.themoviedb.org/3/tv/top_rated?api_key=${process.env.REACT_APP_TMDB_KEY}&language=en-US&page=${page}`
  )
  .then(res => res.json())
  .then(json => json.results)
}

export const getTVDetails = (id) => {
  return fetch(
    `https://api.themoviedb.org/3/tv/${id}?api_key=${process.env.REACT_APP_TMDB_KEY}&language=en-US`
  )
  .then(res => res.json())
}

function postData(url, data) {
  // Default options are marked with *
  return fetch(url, {
    body: JSON.stringify(data), // must match 'Content-Type' header
    cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
    credentials: 'same-origin', // include, same-origin, *omit
    headers: {
      'user-agent': 'Mozilla/4.0 MDN Example',
      'content-type': 'application/json'
    },
    method: 'POST', // *GET, POST, PUT, DELETE, etc.
    mode: 'cors', // no-cors, cors, *same-origin
    redirect: 'follow', // manual, *follow, error
    referrer: 'no-referrer', // *client, no-referrer
  })
  .then(response => response.json()) // parses response to JSON
}

export const postTVRating = (id, val) => {
  return postData(`https://api.themoviedb.org/3/tv/${id}/rating?api_key=${process.env.REACT_APP_TMDB_KEY}&session_id=${process.env.REACT_APP_TMDB_SESSION_ID}`, {"value": val})
}

export const getTVRating = () => {
  return fetch(`https://api.themoviedb.org/3/account/${process.env.REACT_APP_TMDB_ACCOUNT_ID}/rated/tv?api_key=${process.env.REACT_APP_TMDB_KEY}&language=en-US&session_id=${process.env.REACT_APP_TMDB_SESSION_ID}&sort_by=created_at.asc`)
  .then(res => res.json())
  .then(json => json.results)
}

export const deleteTVRating = (id) => {
  return fetch(`https://api.themoviedb.org/3/tv/${id}/rating?api_key=${process.env.REACT_APP_TMDB_KEY}&session_id=${process.env.REACT_APP_TMDB_SESSION_ID}`, {
    method: 'DELETE'
  })
  .then(res => res.json())
}

export const searchTV = (query, page) => {
  return fetch(`https://api.themoviedb.org/3/search/tv?api_key=${process.env.REACT_APP_TMDB_KEY}&language=en-US&page=${page}&query=${query}&include_adult=false`)
  .then(res => res.json())
  .then(json => json.results)
}

export const getSimilarTVs = (id) => {
  return fetch(`https://api.themoviedb.org/3/tv/${id}/similar?api_key=${process.env.REACT_APP_TMDB_KEY}&language=en-US&page=1`)
  .then(res => 
    res.json()
  ).then(json => 
    json.results
  )
}

export const getTVReviews = (id) => {
  return fetch(`https://api.themoviedb.org/3/tv/${id}/reviews?api_key=${process.env.REACT_APP_TMDB_KEY}&language=en-US&page=1`)
  .then(res => res.json())
  .then(json => json.results)
}

export const getCreator = (id) => {
  return fetch(`https://api.themoviedb.org/3/credit/${id}?api_key=${process.env.REACT_APP_TMDB_KEY}`)
  .then(res => res.json())
  .then(json => json.person)
}

export const getLists = () => {
  return fetch(`https://api.themoviedb.org/3/account/${process.env.REACT_APP_TMDB_ACCOUNT_ID}/lists?api_key=${process.env.REACT_APP_TMDB_KEY}&language=en-US&session_id=${process.env.REACT_APP_TMDB_SESSION_ID}&page=1`)
  .then(res => res.json())
  .then(json => json.results)
}

export const createList = (data) => {
  return postData(`https://api.themoviedb.org/3/list?api_key=${process.env.REACT_APP_TMDB_KEY}&session_id=${process.env.REACT_APP_TMDB_SESSION_ID}`, data)
}

export const addMovieToList = (list_id, media_id) => {
  return postData(`https://api.themoviedb.org/3/list/${list_id}/add_item?api_key=${process.env.REACT_APP_TMDB_KEY}&session_id=${process.env.REACT_APP_TMDB_SESSION_ID}`, {
    media_id: media_id
  })
}

export const getListDetail = (id) => {
  return fetch(`https://api.themoviedb.org/3/list/${id}?api_key=${process.env.REACT_APP_TMDB_KEY}&language=en-US`)
  .then(res => res.json())
  .then(json => json.items)
}