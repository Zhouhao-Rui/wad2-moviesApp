import React, { useState } from 'react'
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import Divider from '@material-ui/core/Divider';
import { Link } from 'react-router-dom';

function CateButtonGroup({ buttonTitles, links, initial_index }) {
  const [currentIndex, setCurrentIndex] = useState(initial_index)

  const handleClick = (index) => {
    console.log(index)
    setCurrentIndex(index)
  }
  return (
    <div className="mt-4">
      <ButtonGroup variant="text" aria-label="text primary button group">
        {buttonTitles.map((buttonTitle, index) => (
          currentIndex === index ?
            <Button style={{ backgroundColor: '#3273dc' }} size="small" key={index}><Link className="text-white" to={links[index]}>{buttonTitle}</Link></Button>
            :
            <Button className="bg-white" size="medium" key={index} onClick={() => handleClick(index)}><Link className="text-dark" to={links[index]}>{buttonTitle}</Link></Button>
        ))}
      </ButtonGroup>
      <Divider />
    </div>
  )
}

export default CateButtonGroup
