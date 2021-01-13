const base_url = "http://localhost:9000/.netlify/functions"

export const getMovies = (page) => {
  return fetch(
    `${base_url}/api/movies/page/${page}`
  )
    .then(res => res.json())
};

export const getMovie = id => {
  return fetch(
    `${base_url}/api/movies/${id}`
  ).then(res => res.json());
};

export const getGenres = () => {
  return fetch(
    `${base_url}/api/genres`
  )
  .then(res => res.json())
};

export const getMovieReviews = id => {
  return fetch(
    `${base_url}/api/movies/${id}/reviews`
  )
  .then(res => res.json())
}

export const getUpcomingMovies = (page) => {
  return fetch(
    `${base_url}/api/movies/upcoming/${page}`
  )
  .then(res => res.json())
}

export const addToFavor = (id) => {
  return postData(`${base_url}/api/users/${window.localStorage.getItem("username")}/favourites`, {id: id})
}

export const getUserFavors = () => {
  return fetch(`${base_url}/api/users/${window.localStorage.getItem("username")}/favourites`, {
    headers: {
      'Authorization': window.localStorage.getItem('token')
    }
  }).then(res => res.json())
}

export const searchMedia = (query_string) => {
  return fetch(
    `${base_url}/api/movies/search/${query_string}`
  )
  .then(res => res.json())
}

export const getTodayTvs = (page) => {
  return fetch(
    `${base_url}/api/tvs/todaytv/page/${page}`
  )
  .then(res => res.json())
}

export const getLatestTVs = () => {
  return fetch(
    `https://api.themoviedb.org/3/tv/latest?api_key=${process.env.REACT_APP_TMDB_KEY}&language=en-US`
  )
  .then(res => res.json())
}

export const getHotTVs = () => {
  return fetch(
    `${base_url}/api/tvs/hottv`
  )
  .then(res => res.json())
}

export const getPopularTVs = (page) => {
  return fetch(
    `${base_url}/api/tvs/populartv/page/${page}`
  )
  .then(res => res.json())
}

export const getTopRatedTVs = (page) => {
  return fetch(
    `${base_url}/api/tvs/topratedtv/page/${page}`
  )
  .then(res => res.json())
}

export const getTVDetails = (id) => {
  return fetch(
    `${base_url}/api/tvs/${id}`
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
      'content-type': 'application/json',
      'Authorization': window.localStorage.getItem('token')
    },
    method: 'POST', // *GET, POST, PUT, DELETE, etc.
    mode: 'cors', // no-cors, cors, *same-origin
    redirect: 'follow', // manual, *follow, error
    referrer: 'no-referrer', // *client, no-referrer
  })
  .then(response => response.json()) // parses response to JSON
}

export const postTVRating = (id, val) => {
  const data = {
    "id": id,
    "rating": val
  }
  return fetch(`${base_url}/api/users/${window.localStorage.getItem("username")}/ratings`, {
    body: JSON.stringify(data), // must match 'Content-Type' header
    cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
    credentials: 'same-origin', // include, same-origin, *omit
    headers: {
      'user-agent': 'Mozilla/4.0 MDN Example',
      'content-type': 'application/json',
      'Authorization': window.localStorage.getItem('token')
    },
    method: 'POST', // *GET, POST, PUT, DELETE, etc.
    mode: 'cors', // no-cors, cors, *same-origin
    redirect: 'follow', // manual, *follow, error
    referrer: 'no-referrer', // *client, no-referrer
  })
 // parses response to JSON
}

export const getTVRating = (id) => {
  return fetch(`${base_url}/api/users/${window.localStorage.getItem("username")}/ratings/${id}`)
  .then(res => res.json())
}

export const deleteTVRating = (id) => {
  return fetch(`${base_url}/api/users/${window.localStorage.getItem("username")}/ratings/?id=${id}`, {
    method: 'DELETE',
    headers: {
      'Authorization': window.localStorage.getItem('token')
    }
  })
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
  return fetch(`${base_url}/api/tvs/${id}/reviews`)
  .then(res => res.json())
}

export const getCreator = (id) => {
  return fetch(`${base_url}/api/creators/${id}`)
  .then(res => res.json())
}

export const getLists = () => {
  return fetch(`https://api.themoviedb.org/3/account/${process.env.REACT_APP_TMDB_ACCOUNT_ID}/lists?api_key=${process.env.REACT_APP_TMDB_KEY}&language=en-US&session_id=${process.env.REACT_APP_TMDB_SESSION_ID}&page=1`)
  .then(res => res.json())
  .then(json => json.results)
}

export const createList = (data) => {
  return postData(`${base_url}/api/users/${window.localStorage.getItem("username")}/list`, data)
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

export const signup = (data) => {
  return postData(`${base_url}/api/users?action=register`, data)
}

export const signin = (data) => {
  return postData(`${base_url}/api/users`, data)
}