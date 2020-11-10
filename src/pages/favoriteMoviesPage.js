import React, {memo} from 'react'
import { useContext } from 'react';
import AddReviewButton from '../components/buttons/addReview';
import PageTemplate from "../components/templateMovieListPage";
import { MoviesContext } from '../contexts/moviesContext';

const FavoriteMoviesPage = () => {
  const context = useContext(MoviesContext)
  const favorites = context.movies.filter(m => m.favorite)

  return (
    <PageTemplate
      movies={favorites}
      title={"Favorite Movies"}
      action={movie => <AddReviewButton movie={movie} />}
    />
  );
}

export default memo(FavoriteMoviesPage)