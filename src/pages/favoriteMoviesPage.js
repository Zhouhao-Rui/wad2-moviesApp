import React, {memo} from 'react'
import AddReviewButton from '../components/buttons/addReview';
import PageTemplate from "../components/templateMovieListPage";
import { shallowEqual, useSelector } from "react-redux";

const FavoriteMoviesPage = () => {
  const { favorites } = useSelector(state => ({
    favorites: state.getIn(["movies", "favorites"])
  }), shallowEqual)

  return (
    <PageTemplate
      movies={favorites}
      title={"Favorite Movies"}
      action={(movie, index) => <AddReviewButton movie={movie} index={index} />}
    />
  );
}

export default memo(FavoriteMoviesPage)