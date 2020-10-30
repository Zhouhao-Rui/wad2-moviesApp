import React, { memo } from 'react'
import MovieHeader from '../headerMovie'
import './moviePage.css'

const TemplateMovie = ({ movie, children }) => {
  return (
    <>
      <MovieHeader movie={movie} />
      <div className="row">
        <div className="col-sm-3">
          <img src={
            movie.poster_path
              ? `https://image.tmdb.org/t/p/w500/${movie.poster_path}`
              : "./film-poster-placeholder.png"
          }
            className="movie"
            alt={movie.title} />
        </div>
        {/* children ==> movieDetails */}
        <div className="col-sm-9">{children}</div>
      </div>
    </>
  )
}

export default memo(TemplateMovie)