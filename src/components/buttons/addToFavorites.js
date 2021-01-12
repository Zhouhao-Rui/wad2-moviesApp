import React, { useContext } from 'react'
import { MoviesContext } from '../../contexts/moviesContext'
import { withRouter } from 'react-router-dom'

const AddToFavoriteButton = ({ movie, history }) => {
  const { addToFavorites } = useContext(MoviesContext)

  const handleAddToFavorite = e => {
    e.preventDefault()
    // should first check the user status, if user not logined, should direct to the login page
    window.localStorage.getItem("username") 
    ? addToFavorites(movie.id)
    : history.push('/signin')
  }

  return (
    <button
      type="button"
      className="btn w-100 btn-primary"
      onClick={handleAddToFavorite}>
      Add to Favorites
    </button>
  )
}

export default withRouter(AddToFavoriteButton)