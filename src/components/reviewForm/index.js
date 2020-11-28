import React, { useContext } from "react";
import "./reviewForm.css";
import useForm from "react-hook-form";
import { MoviesContext } from '../../contexts/moviesContext'
import { withRouter } from "react-router-dom";
import { useDispatch } from 'react-redux'
import { addFavorReviewAction, addWatchListReviewAction } from "../store/actionCreators";

const ReviewForm = ({ movie, index, type, history }) => {
  const { register, handleSubmit, errors, reset } = useForm();
  const context = useContext(MoviesContext);

  const dispatch = useDispatch()

  const onSubmit = data => {
    context.addReview(movie, data)
    if (type === 'favorites') {
      dispatch(addFavorReviewAction(data, index))
      history.push("/movies/favorites");
    } else {
      dispatch(addWatchListReviewAction(data, index))
      history.push("/movies/watchLists");
    }
  };

  return (
    <form className="form bg-dark text-light" onSubmit={handleSubmit(onSubmit)}>
      <h3>Add your review</h3>
      <div className="form-group">
        <input
          data-cy="reviewInput"
          type="text"
          className="form-control"
          placeholder="Author"
          defaultValue={movie.review ? movie.review.author : ""}
          name="author"
          ref={register({ required: "Author name required" })}
        />
      </div>
      {errors.author && <p className=" text-white">{errors.author.message} </p>}
      <div className="form-group">
        <textarea
          rows="10"
          type="text"
          className="form-control"
          placeholder="Write your review"
          defaultValue={movie.review ? movie.review.content : ""}
          name="content"
          ref={register({
            required: "No review text",
            minLength: { value: 10, message: "Review is too short" }
          })}
        />
      </div>
      {errors.content && (
        <p className="text-white">{errors.content.message} </p>
      )}

      <button type="submit" className="btn btn-primary">
        Submit
      </button>
      <button
        type="reset"
        className="btn btn-primary reset"
        onClick={() => {
          reset({
            author: "",
            content: ""
          });
        }}
      >
        Reset
      </button>
    </form>
  );
};

export default withRouter(ReviewForm);