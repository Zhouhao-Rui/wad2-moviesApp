import React, {memo} from 'react'
import StubAPI from "../api/stubAPI";
import PageTemplate from "../components/templateMovieListPage";

const FavoriteMoviesPage = () => {
  const toDo = () => true;

  return (
    <PageTemplate
      movies={StubAPI.getAll()}
      title={"Favorite Movies"}
      buttonHandler={toDo}
    />
  );
}

export default memo(FavoriteMoviesPage)