import React, { memo } from 'react'
import Movie from '../movieCard'
import './movieList.css'

export default memo(function movieList(props) {
  return (
    <div className="row movies bg-info">
      {props.movies.map((movie, index) => (
        <Movie key={movie.id} movie={movie} buttonHandler={props.buttonHandler} />
      ))}
    </div>
  )
})
