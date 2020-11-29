import {CHANGE_TODAY_TVS} from './constants'
import {getTodayTvs} from '../../api/tmdb-api'

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