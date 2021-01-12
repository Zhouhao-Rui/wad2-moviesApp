import React, { memo, useState, useEffect } from 'react'
import AddReviewButton from '../components/buttons/addReview';
import PageTemplate from "../components/templateMovieListPage";
import { getUserFavors } from '../api/tmdb-api'

const FavoriteMoviesPage = () => {
  const [favorites, setFavorites] = useState([])
  useEffect(() => {
    getUserFavors().then(res => {
      setFavorites(res)
    })
  }, [])

  return (
    favorites.length &&
    <PageTemplate
      movies={favorites}
      title={"Favorite Movies"}
      action={(movie, index) => <AddReviewButton movie={movie} index={index} type="favorites" />}
    />
  );
}

export default memo(FavoriteMoviesPage)