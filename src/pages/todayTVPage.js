import React from 'react';
import { getTodayTVsAction } from '../components/tvStore/actionCreators'
import TVPage from '../components/templateTVListPage'

const TodayTVPage = (props) => {
  const page = props.match.params.page
  return (
    <TVPage
      page={page}
      stateName="today_tvs"
      initial_index="0" 
      router_name="/tvs/pages" 
      action={getTodayTVsAction} />
  )
}

export default TodayTVPage