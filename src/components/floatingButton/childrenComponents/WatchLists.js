import React from 'react'
import './style.css'

function WatchLists({ watchLists }) {
  return (
    <>
      <div className="circle circle1 text-white">All</div>
      {
        watchLists.length === 1 ?
        <div className="circle circle2" style={{backgroundImage: `url(https://image.tmdb.org/t/p/w500/${watchLists[0].poster_path})`}}></div>
        :
        <>
        <div className="circle circle2" style={{backgroundImage: `url(https://image.tmdb.org/t/p/w500/${watchLists[0].poster_path})`}}></div>
        <div className="circle circle3" style={{backgroundImage: `url(https://image.tmdb.org/t/p/w500/${watchLists[1].poster_path})`}}></div>
        </>
      }
    </>
  )
}

export default WatchLists
