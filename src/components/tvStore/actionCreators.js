import { CHANGE_TODAY_TVS, CHANGE_LATEST_TVS, CHANGE_HOT_TVS, CHANGE_TODAY_TVS_BY_SORT } from './constants'
import { getTodayTvs, getLatestTVs, getHotTVs } from '../../api/tmdb-api'

const changeTodayTVsAction = (res) => ({
  type: CHANGE_TODAY_TVS,
  tvs: res
})

export const getTodayTVsAction = (page) => {
  return dispatch => {
    getTodayTvs(page).then(res => {
      dispatch(changeTodayTVsAction(res))
    })
  }
}

const changeLatestTVsAction = (res) => ({
  type: CHANGE_LATEST_TVS,
  tvs: res
})

export const getLatestTVsAction = () => {
  return dispatch => {
    getLatestTVs().then(res => {
      dispatch(changeLatestTVsAction(res))
    })
  }
}

const changeHotTVsAction = (res) => ({
  type: CHANGE_HOT_TVS,
  tvs: res
})

export const getHotTVsAction = () => {
  return dispatch => {
    getHotTVs().then(res => {
      dispatch(changeHotTVsAction(res))
    })
  }
}

export const changeTodayTVsBySortAvtion = (res) => ({
  type: CHANGE_TODAY_TVS_BY_SORT,
  tvs: res
})
