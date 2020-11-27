import {CHANGE_FAVORITE_MOVIES, ADD_WATCHLIST_REVIEWS, ADD_FAVOR_REVIEWS, CHANGE_WATCH_LISTS, CHANGE_MOVIE_CURRENT_PAGE, CHANGE_UPCOMING_PAGE_NUMS, CHANGE_MOVIE_PAGE_NUMS, CHANGE_HOME_PAGE, CHANGE_UPCOMING_PAGE, CHANGE_UPCOMING_CURRENT_PAGE} from './constants'

export const changeMoviesAction = (movie) => ({
  type: CHANGE_FAVORITE_MOVIES,
  favorites: movie
})

export const changeHomePageAction = (page) => ({
  type: CHANGE_HOME_PAGE,
  page
})

export const changeUpcomingPageAction = (page) => ({
  type: CHANGE_UPCOMING_PAGE,
  page
})

export const changeMoviePageNums = (pageNums) => ({
  type: CHANGE_MOVIE_PAGE_NUMS,
  pageNums
})

export const changeUpcomingPageNums = (pageNums) => ({
  type: CHANGE_UPCOMING_PAGE_NUMS,
  pageNums
})

export const changeMovieCurrentPage = (currentPage) => ({
  type: CHANGE_MOVIE_CURRENT_PAGE,
  currentPage
})

export const changeUpcomingCurrentPage = (currentPage) => ({
  type: CHANGE_UPCOMING_CURRENT_PAGE,
  currentPage
})

export const changeWatchListAction = (movie) => ({
  type: CHANGE_WATCH_LISTS,
  watchLists: movie
})

export const addFavorReviewAction = (review, index) => ({
  type: ADD_FAVOR_REVIEWS,
  review,
  index
})

export const addWatchListReviewAction = (review, index) => ({
  type: ADD_WATCHLIST_REVIEWS,
  review,
  index
})

