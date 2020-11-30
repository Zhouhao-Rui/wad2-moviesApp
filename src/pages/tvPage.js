import React, { useEffect } from 'react';
import { withRouter } from 'react-router';
import Pagination from '@material-ui/lab/Pagination';
import { useDispatch } from 'react-redux'
import { getTodayTVsAction } from '../components/tvStore/actionCreators'
import SearchHeader from '../components/tv/searchHeader'

const TVPage = (props) => {
  const page = props.match.params.page
  const [currentPage, setCurrentPage] = React.useState(1);
  const handleChange = (event, value) => {
    setCurrentPage(value);
    props.history.push(`/tvs/pages/${value}`)
  };
  const dispatch = useDispatch()
  useEffect(() => {
    setCurrentPage(Number(page))
    dispatch(getTodayTVsAction(page))
  }, [dispatch, page])

  return (
    <>
      <SearchHeader />
      <Pagination count={10} defaultPage={1} page={currentPage} color="primary" onChange={handleChange} />
    </>
  )
}

export default withRouter(TVPage)