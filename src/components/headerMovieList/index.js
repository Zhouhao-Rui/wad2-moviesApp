import React, { memo } from 'react'

export default memo(function Header({ numMovies }) {
  console.log(window.location.pathname)
  return (
    <div>
      <div className="row">
        <div className="col-md-6 offset-4">
          <h2>
            {window.location.pathname === '/movies/upcoming' ? 
             "Upcoming Movies " : "All Movies "}
            <span className="badge badge-pill badge-success">{numMovies}</span>
          </h2>
        </div>
      </div>
    </div>
  )
})
