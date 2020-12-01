import React from 'react';
import { getTopRatedTVsAction } from '../components/tvStore/actionCreators'
import TVPage from '../components/templateTVListPage'

const PopularTVPage = (props) => {
  const page = props.match.params.page
  return (
    <TVPage
      page={page}
      stateName="toprated_tvs"
      initial_index="2" 
      router_name="/tvs/toprate/pages" 
      action={getTopRatedTVsAction} />
  )
}

export default PopularTVPage