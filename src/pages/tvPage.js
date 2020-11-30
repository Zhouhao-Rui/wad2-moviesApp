import React, { useEffect } from 'react';
import { withRouter } from 'react-router';
import Pagination from '@material-ui/lab/Pagination';
import { useDispatch, useSelector } from 'react-redux'
import { getTodayTVsAction, changeTodayTVsBySortAvtion } from '../components/tvStore/actionCreators'
import SearchHeader from '../components/tv/searchHeader'
import SortButtonGroup from '../components/tv/sortButtonGroup'
import CateButtonGroup from '../components/tv/cateButtonGroup'
import TVCard from '../components/tv/tvCard'

const TVPage = (props) => {
  const page = props.match.params.page
  const [currentPage, setCurrentPage] = React.useState(1);
  const [displayedTVs, setDisplayedTVs] = React.useState([])
  const { todayTVs } = useSelector(state => ({
    todayTVs: state.getIn(["tvs", "today_tvs"])
  }))
  const handleChange = (event, value) => {
    setCurrentPage(value);
    props.history.push(`/tvs/pages/${value}`)
  };
  const dispatch = useDispatch()
  useEffect(() => {
    setCurrentPage(Number(page))
    dispatch(getTodayTVsAction(page))
  }, [dispatch, page])
  useEffect(() => {
    setDisplayedTVs(todayTVs)
  }, [todayTVs])
  const handleSortChange = (sortTVs) => {
    setDisplayedTVs(sortTVs)
  }

  const handleSearch = (searchTVs) => {
    setDisplayedTVs(searchTVs)
  }
  return (
    <>
      <SearchHeader tvs={displayedTVs} handleTextSearch={handleSearch} />
      <CateButtonGroup buttonTitles={["Today Air TVs", "Popular TVs", "Top rated"]} links={["/tvs", "/tvs/popular", "/tvs/toprate"]} />
      <SortButtonGroup buttonTitles={["popularity", "vote_count", "vote_average", "first_air_date"]} tvs={displayedTVs} onSortChange={handleSortChange} />
      <div className="tv-container row mt-4">
        {
          displayedTVs && displayedTVs.map(tv => (
            <TVCard tv={tv} key={tv.id} />
          ))
        }
      </div>
      <Pagination count={10} defaultPage={1} page={currentPage} color="primary" onChange={handleChange} />
    </>
  )
}

export default withRouter(TVPage)