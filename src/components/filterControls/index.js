import React, { memo, useEffect, useState } from 'react'
import "./filterControl.css"
import { getGenres } from "../../api/tmdb-api";

export default memo(function FilterControls(props) {
  const [genres, setGenres] = useState([{ id: '0', name: "All" }])

  useEffect(() => {
    getGenres().then(allGenres => {
      setGenres([genres[0], ...allGenres]);
    });
  }, []);

  const handleChange = (e, type, value) => {
    e.preventDefault()
    // give the type and value to the Homepage Component
    // inverse data flow pattern from child -> parent
    props.onUserInput(type, value)
  };
  const handleTextChange = e => {
    handleChange(e, "name", e.target.value)
  }
  const handleGenreChange = e => {
    handleChange(e, "genre", e.target.value)
  };

  return (
    <div className="row bg-warning">
      <div className="col-md-12">
        <h4>
          <span>List Filtering</span>
          <input 
          type="text"
          placeholder="Title Search"
          onChange={handleTextChange} />
          <span>Genres:</span>
          <select id="genre" onChange={handleGenreChange}>
            {genres.map((genre, index) => {
              return (
                <option key={genre.id} value={genre.id}>
                  {genre.name}
                </option>
              )
            })}
          </select>
        </h4>
      </div>
    </div>
  )
})
