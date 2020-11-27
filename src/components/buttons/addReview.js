import React from "react";
import { Link } from "react-router-dom";

const ReviewButton = ({ movie, index, type }) => {
  return (
    <Link
      className="btn w-100 btn-primary "
      to={{
        pathname: `/reviews/form`,
        state: {
          movie: movie, 
          index: index,
          type: type
        }
      }}
    >
      Write a Review
    </Link>
  );
};

export default ReviewButton;