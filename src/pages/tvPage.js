import React, { useEffect } from 'react';
import { withRouter } from 'react-router';
import { Link } from 'react-router-dom';
import Pagination from '@material-ui/lab/Pagination';
import PaginationItem from '@material-ui/lab/PaginationItem';
import { useDispatch, useSelector } from 'react-redux'
import {getTodayTVsAction} from '../components/tvStore/actionCreators'

const TVPage = (props) => {
  const page = props.match.params.page
  const { todayTVs } = useSelector(state => ({
    todayTVs: state.getIn(["tvs", "today_tvs"])
  }))
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getTodayTVsAction(page))
  }, [dispatch, page])

  return (
    <Pagination count={10} defaultPage={1} color="primary"
      renderItem={(item) => (
        <PaginationItem
          component={Link}
          to={`/tvs/pages/${page}`}
          {...item}
        />
      )} />
  )
}

export default withRouter(TVPage)