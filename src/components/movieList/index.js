import React, { memo } from 'react'
import Movie from '../movieCard'
import './movieList.css'

export default memo(function movieList({movies, action}) {
  return (
    <div className="row movies bg-info">
      {movies.map((movie, index) => (
        <Movie key={movie.id} movie={movie} action={action} />
      ))}
    </div>
  )
})
