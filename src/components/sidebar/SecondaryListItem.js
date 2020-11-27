import React from 'react'
import { ListItemText } from '@material-ui/core';

function SecondaryListItem({items}) {
  return (
    <>
      {items.map((item, index) => (
        <ListItemText key={index}>- {item}</ListItemText>
      ))}
    </>
  )
}

export default SecondaryListItem
