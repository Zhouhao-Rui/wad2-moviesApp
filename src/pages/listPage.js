import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { getLists, getListDetail } from '../api/tmdb-api'
import SearchHeader from '../components/tv/searchHeader'

/**
 * List
 */
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import FolderIcon from '@material-ui/icons/Folder';

const SecondaryListItem = ({item}) => {
  const [medias, setMedias] = useState([])
  useEffect(() => {
    getListDetail(item.id).then(res => {
      setMedias(res)
    })
  }, [item.id])
  return (
    <>
      {medias.map((item, index) => (
        <ListItemText key={index}>- {item.title}</ListItemText>
      ))}
    </>
  )
}

function ListPage() {
  const [lists, setLists] = useState([])
  useEffect(() => {
    getLists().then(res => {
      console.log(res)
      setLists(res)
    })
  }, [])
  return (
    <div>
      <SearchHeader />
      <div className="mt-5">
        <h2>All Lists</h2>
        {
          lists.length
            ? lists.map(list => (
              <List key={list.id}>
                <ListItem button>
                  <ListItemIcon>
                    <FolderIcon />
                  </ListItemIcon>
                  <ListItemText
                    primary={list.name}
                    secondary={<SecondaryListItem item={list} />}
                  />
                </ListItem>
              </List>
            ))
            :
            <div className="mt-3">There is no List Here, create a one?<Link to="/list/create">GO</Link></div>
        }
      </div>
    </div>
  )
}

export default ListPage
