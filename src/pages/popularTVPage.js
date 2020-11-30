import React from 'react';
import { getPopularTVsAction } from '../components/tvStore/actionCreators'
import TVPage from '../components/templateTVListPage'

const PopularTVPage = (props) => {
  const page = props.match.params.page
  return (
    <TVPage
      page={page}
      stateName="popular_tvs"
      initial_index="1" 
      router_name="/tvs/popular/pages" 
      action={getPopularTVsAction} />
  )
}

export default PopularTVPage