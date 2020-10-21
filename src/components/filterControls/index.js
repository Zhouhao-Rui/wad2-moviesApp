import React, { memo } from 'react'

export default memo(function FilterControls(props) {
  const genres = [
    {id: 1, name: 'Animation'},
    {id: 2, name: 'Comedy'},
    {id: 3, name: 'Thriller'}
  ]

  return (
    <div className="row bg-warning">
      <div className="col-md-12">
        <h4>
          <span>List Filtering</span>
          <input type="text"
          placeholder="Title Search"/>
          <span>Genres:</span>
          <select id="genre">
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
