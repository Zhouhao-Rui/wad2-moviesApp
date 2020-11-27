import React from "react";
import PageTemplate from "../components/templateMoviePage";
import ReviewForm from '../components/reviewForm'

const ReviewFormPage = props => {

  return (
      <PageTemplate movie={props.location.state.movie} index={props.location.state.index}>
          <ReviewForm movie={props.location.state.movie} index={props.location.state.index} />
      </PageTemplate>
  );
};
export default ReviewFormPage;