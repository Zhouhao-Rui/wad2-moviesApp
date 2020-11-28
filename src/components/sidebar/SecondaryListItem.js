import React from 'react'
import { ListItemText } from '@material-ui/core';
import { Link } from 'react-router-dom';

function SecondaryListItem({items, links}) {
  return (
    <>
      {items.map((item, index) => (
        <ListItemText data-cy="secondaryListItem" key={index}><Link to={links[index]} className="text-dark">- {item}</Link></ListItemText>
      ))}
    </>
  )
}

export default SecondaryListItem
