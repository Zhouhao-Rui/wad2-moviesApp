import React, { useContext } from 'react'
import { MoviesContext } from '../../contexts/moviesContext'

const AddWatchList = ({ movie }) => {

  const { addToMovieList } = useContext(MoviesContext)

  const handleAddtoMovieList = e => {
    e.preventDefault()
    addToMovieList(movie.id)
  }

  return (
    <button
      type="button"
      className="btn w-100 btn-primary"
      onClick={handleAddtoMovieList}>
      Add to Watch List
    </button>
  )
}

export default AddWatchList