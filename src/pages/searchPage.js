import React, { useEffect, useState } from 'react'
import Pagination from '@material-ui/lab/Pagination';
import SearchHeader from '../components/tv/searchHeader'
import TVCard from '../components/tv/tvCard'
import { useDispatch, useSelector } from 'react-redux'
import { getSearchTVsAction } from '../components/tvStore/actionCreators'
import {withRouter} from 'react-router-dom'

function SearchPage(props) {
  const { value, page } = props.match.params
  const [query, setQuery] = useState("")
  const [currentPage, setCurrentPage] = useState(1);
  const [displayedTVs, setDisplayedTVs] = React.useState([])
  const { tvs } = useSelector(state => ({
    tvs: state.getIn(["tvs", "search_tvs"])
  }))

  const dispatch = useDispatch()

  useEffect(() => {
    setCurrentPage(Number(page) || 1)
    dispatch(getSearchTVsAction(value, currentPage))
    setQuery(value)
  }, [currentPage, dispatch, value, page])

  useEffect(() => {
    setDisplayedTVs(tvs)
  }, [tvs])

  const handleChange = (event, value) => {
    setCurrentPage(value);
    props.history.push(`/search/${query}/pages/${value}`)
  };

  const handleSearch = (searchTVs) => {
    setDisplayedTVs(searchTVs)
  }
  return (
    
    <>
      <SearchHeader tvs={tvs} handleTextSearch={handleSearch} />
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

export default withRouter(SearchPage)
