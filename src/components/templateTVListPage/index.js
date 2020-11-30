import React, { useEffect } from 'react';
import { withRouter } from 'react-router';
import Pagination from '@material-ui/lab/Pagination';
import { useDispatch, useSelector } from 'react-redux'
import SearchHeader from '../tv/searchHeader'
import SortButtonGroup from '../tv/sortButtonGroup'
import CateButtonGroup from '../tv/cateButtonGroup'
import TVCard from '../tv/tvCard'

const TVPage = ({ page, action, stateName, router_name, history, initial_index }) => {
  const [currentPage, setCurrentPage] = React.useState(1);
  const [displayedTVs, setDisplayedTVs] = React.useState([])
  const { tvs } = useSelector(state => ({
    tvs: state.getIn(["tvs", stateName])
  }))
  const handleChange = (event, value) => {
    setCurrentPage(value);
    history.push(`${router_name}/${value}`)
  };
  const dispatch = useDispatch()
  useEffect(() => {
    setCurrentPage(Number(page))
    dispatch(action(page))
  }, [dispatch, page, action])
  useEffect(() => {
    setDisplayedTVs(tvs)
  }, [tvs])
  const handleSortChange = (sortTVs) => {
    setDisplayedTVs(sortTVs)
  }

  const handleSearch = (searchTVs) => {
    setDisplayedTVs(searchTVs)
  }
  return (
    <>
      <SearchHeader tvs={tvs} handleTextSearch={handleSearch} />
      <CateButtonGroup buttonTitles={["Today Air TVs", "Popular TVs", "Top rated"]} links={["/tvs", "/tvs/popular", "/tvs/toprate"]} initial_index={Number(initial_index)} />
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