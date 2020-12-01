import { CHANGE_FAVORITE_MOVIES, CHANGE_WATCH_LISTS, CHANGE_UPCOMING_CURRENT_PAGE, CHANGE_MOVIE_CURRENT_PAGE, CHANGE_UPCOMING_PAGE_NUMS, CHANGE_MOVIE_PAGE_NUMS, CHANGE_HOME_PAGE, CHANGE_UPCOMING_PAGE, ADD_FAVOR_REVIEWS, ADD_WATCHLIST_REVIEWS } from './constants'
import { Map, updateIn } from 'immutable'


const initialState = Map({
  favorites: [],
  watchLists: [],
  homePage: 1,
  upcomingPage: 1,
  upcomingPageNums: [1, 2, 3],
  moviePageNums: [1, 2, 3],
  currentUpcomingPage: 1,
  currentMoviePage: 1,
})

const movieReducer = (state = initialState, action) => {
  switch (action.type) {
    case CHANGE_FAVORITE_MOVIES:
      return state.update("favorites", item => item.concat(action.favorites))
    case CHANGE_HOME_PAGE:
      return state.set("homePage", action.page)
    case CHANGE_UPCOMING_PAGE:
      return state.set("upcomingPage", action.page)
    case CHANGE_UPCOMING_PAGE_NUMS:
      return state.set("upcomingPageNums", action.pageNums)
    case CHANGE_MOVIE_PAGE_NUMS:
      return state.set("moviePageNums", action.pageNums)
    case CHANGE_UPCOMING_CURRENT_PAGE:
      return state.set("currentUpcomingPage", action.currentPage)
    case CHANGE_MOVIE_CURRENT_PAGE:
      return state.set("currentMoviePage", action.currentPage)
    case CHANGE_WATCH_LISTS:
      return state.update("watchLists", item => item.concat(action.watchLists))
    case ADD_FAVOR_REVIEWS:
      return updateIn(state, ["favorites", action.index, 'review'], item => item.concat(action.review))
    case ADD_WATCHLIST_REVIEWS:
      return updateIn(state, ["watchLists", action.index, 'review'], item => item.concat(action.review))
    default:
      return state
  }
}

export default movieReducer