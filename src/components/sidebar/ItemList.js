import React, { useState } from 'react'
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import SecondaryListItem from './SecondaryListItem'

function ItemList({ icon, primaryText, items, links }) {
  const [open, setOpen] = useState(false)
  return (
    <ListItem button>
      <ListItemIcon>
        {icon}
      </ListItemIcon>
      <ListItemText data-cy="ListItem" primary={primaryText} onClick={() => setOpen(!open)} secondaryTypographyProps={{component: 'div'}} secondary={open ? <SecondaryListItem items={items} links={links} /> : ''} />
    </ListItem>
  )
}

export default ItemList
