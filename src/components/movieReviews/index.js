import React, { useEffect, useState, memo } from "react";
import { Link } from "react-router-dom";
import { getMovieReviews } from "../../api/tmdb-api";
import { excerpt } from "../../util";

const MovieReviews = ({ movie }) => {
  const [reviews, setReviews] = useState([])

  useEffect(() => {
    getMovieReviews(movie.id).then(reviews => {
      setReviews(reviews)
    })
  }, [movie.id])

  return (
    <table className="table table-striped table-bordered table-hover">
      <thead>
        <tr>
          <th scope="col">Author</th>
          <th scope="col">Excerpt</th>
          <th scope="col">More</th>
        </tr>
      </thead>
      <tbody>
        {reviews.map(review => {
          return (
            <tr key={review.id}>
              <td>{review.author}</td>
              <td>{excerpt(review.content)}</td>
              <td>
                {" "}
                <Link
                  to={{
                    pathname: `/reviews/${review.id}`,
                    state: {
                      review: review,
                      movie: movie
                    }
                  }}
                  >
                    Full Review
                  </Link>
              </td>
            </tr>
          )
        })}
      </tbody>
    </table>
  )
}

export default memo(MovieReviews)