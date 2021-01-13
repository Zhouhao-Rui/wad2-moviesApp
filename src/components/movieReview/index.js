import React, { memo } from 'react'

const MovieReview = ({ review }) => {
  return (
    <>
      <p>Review By: {review.author.name}</p>
      <p>{review.content}</p>
    </>
  )
}

export default memo(MovieReview)