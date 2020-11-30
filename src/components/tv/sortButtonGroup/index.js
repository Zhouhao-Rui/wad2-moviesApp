import React, { useState } from 'react'
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';

function SortButtonGroup({ buttonTitles, tvs, onSortChange }) {
  const [currentIndex, setCurrentIndex] = useState(0)

  const handleClick = (title, index) => {
    const copy_tvs = [...tvs]
    setCurrentIndex(index)
    // change the tvs by sort
    if (title === "first_air_date") {
      onSortChange(copy_tvs.sort((a, b) => {
        const aTime = new Date(a[title])
        const bTime = new Date(b[title])

        return aTime.getTime() - bTime.getTime()
      }))
    }
    onSortChange(copy_tvs.sort((a, b) => {
      return a[title] - b[title]
    }))
  }
  return (
    <div className="mt-2">
      <ButtonGroup aria-label="outlined primary button group">
        {buttonTitles.map((buttonTitle, index) => (
          currentIndex === index ?
            <Button style={{ backgroundColor: '#3298dc' }} className="text-white" size="small" key={index}>{buttonTitle}</Button>
            :
            <Button className="bg-white" size="small" key={index} onClick={() => handleClick(buttonTitle, index)}>{buttonTitle}</Button>
        ))}
      </ButtonGroup>
    </div>
  )
}

export default SortButtonGroup
