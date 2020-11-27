import React, { useEffect, useState, memo } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getMovieReviews } from "../../api/tmdb-api";
import { excerpt } from "../../util";

const MovieReviews = ({ movie }) => {
  const [reviews, setReviews] = useState([])

  // get the movies with reviews
  const {favorites} = useSelector(state => ({
    favorites: state.getIn(['movies', 'favorites'])
  }))

  // find the movie
  const reviewMovie = favorites.find(item => item.id === movie.id)

  useEffect(() => {
    getMovieReviews(movie.id).then(reviews => {
      reviewMovie 
      ? 
      setReviews([...reviews, ...reviewMovie.review])
      :
      setReviews([...reviews])
    })
  }, [movie.id, reviewMovie])

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