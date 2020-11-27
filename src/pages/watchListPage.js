import React, {memo} from 'react'
import AddReviewButton from '../components/buttons/addReview';
import PageTemplate from "../components/templateMovieListPage";
import { shallowEqual, useSelector } from "react-redux";

const WatchListPage = () => {
  const { watchLists } = useSelector(state => ({
    watchLists: state.getIn(["movies", "watchLists"])
  }), shallowEqual)

  return (
    <PageTemplate
      movies={watchLists}
      title={"Watch List Movies"}
      action={(movie, index) => <AddReviewButton movie={movie} index={index} type="watchList" />}
    />
  );
}

export default memo(WatchListPage)