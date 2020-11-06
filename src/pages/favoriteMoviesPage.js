import React, {memo} from 'react'
import StubAPI from "../api/stubAPI";
import AddReviewButton from '../components/buttons/addReview';
import PageTemplate from "../components/templateMovieListPage";

const FavoriteMoviesPage = () => {

  return (
    <PageTemplate
      movies={StubAPI.getAll()}
      title={"Favorite Movies"}
      action={movie => <AddReviewButton movie={movie} />}
    />
  );
}

export default memo(FavoriteMoviesPage)