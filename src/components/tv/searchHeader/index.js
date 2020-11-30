import React, { useEffect } from 'react'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import SearchIcon from '@material-ui/icons/Search';
import './style.css'
import { useDispatch, useSelector } from 'react-redux'
import { getHotTVsAction } from '../../tvStore/actionCreators'
import { Link } from 'react-router-dom'

const SearchHeader = () => {
  const { hot_tvs } = useSelector(state => ({
    hot_tvs: state.getIn(["tvs", "hot_tvs"])
  }))

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getHotTVsAction())
  }, [dispatch])

  return (
    <div className="col-sm-10 d-flex justify-content-start align-items-center flex-wrap search-container">
      <TextField id="outlined-basic" label="Search Your movie" variant="outlined" className="bg-white search-input" size="small" />
      <Button className="text-white search-button" variant="contained" style={{ backgroundColor: "#3298dc" }} endIcon={<SearchIcon />}>search</Button>
      <div className="text-white">
        <span className="mr-2">hot air tvs:</span>
        {hot_tvs && hot_tvs.sort((a, b) => { return (b.popularity - a.popularity) }).slice(0, 6).map(tv => (
          <Link to={`/movies/${tv.id}`} className="text-white mr-3" key={tv.id}>
            <span>{tv.name}</span>
          </Link>
        ))}
      </div>
    </div>
  )
}

export default SearchHeader
