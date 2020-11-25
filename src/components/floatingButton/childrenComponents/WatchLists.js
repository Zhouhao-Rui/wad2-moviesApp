import React from 'react'
import './style.css'
import {withRouter} from 'react-router-dom'

function WatchLists({ watchLists, history }) {
  return (
    <>
      <div className="circle circle1 text-white" onClick={e => history.push('/movies/watchLists')}>All</div>
      {
        watchLists.length === 1 ?
        <div className="circle circle2" style={{backgroundImage: `url(https://image.tmdb.org/t/p/w500/${watchLists[0].poster_path})`}} onClick={() => history.push(`/movies/${watchLists[0].id}`)}></div>
        :
        <>
        <div className="circle circle2" style={{backgroundImage: `url(https://image.tmdb.org/t/p/w500/${watchLists[0].poster_path})`}} onClick={() => history.push(`/movies/${watchLists[0].id}`)}></div>
        <div className="circle circle3" style={{backgroundImage: `url(https://image.tmdb.org/t/p/w500/${watchLists[1].poster_path})`}} onClick={() => history.push(`/movies/${watchLists[1].id}`)}></div>
        </>
      }
    </>
  )
}

export default withRouter(WatchLists)
