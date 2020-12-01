import React, { useState, useEffect } from 'react'
/** Material UI */
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import MovieIcon from '@material-ui/icons/Movie';
import LiveTvIcon from '@material-ui/icons/LiveTv';
import VideoLibraryIcon from '@material-ui/icons/VideoLibrary';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ItemList from './ItemList';
import Input from '@material-ui/core/Input';
import SearchIcon from '@material-ui/icons/Search';

import { searchMedia } from '../../api/tmdb-api'
import useDebounce from '../../hooks/useDebounce'
import Carousel from '../carousel';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: 120,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
  },
}));
function SideBar() {
  /** Material UI */
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  /** search */
  const [searchItem, setSearchItem] = useState('')
  const [medias, setMedias] = useState([])
  const [isSearching, setIsSearching] = useState(false)

  const debouncedSearchItem = useDebounce(searchItem, 500)

  useEffect(() => {
    if (debouncedSearchItem) {
      setIsSearching(true)
      searchMedia(debouncedSearchItem).then(res => {
        setIsSearching(false)
        setMedias(res)
      })
    } else {
      setMedias([])
    }
  }, [debouncedSearchItem])

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Toolbar>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          onClick={handleDrawerOpen}
          edge="start"
          className={clsx(classes.menuButton, open && classes.hide)}
        >
          <MenuIcon data-cy="menu" />
        </IconButton>
      </Toolbar>
      <Drawer
        className={classes.drawer}
        variant="persistent"
        anchor="left"
        open={open}
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <div className={classes.drawerHeader}>
          <h4>TMDB WORLD</h4>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>
        </div>
        <Divider />
        <List>
          <ListItem>
            <ListItemIcon>
              <SearchIcon />
            </ListItemIcon>
            <Input data-cy="searchInput" placeholder="search media..." onChange={e => setSearchItem(e.target.value)} />
          </ListItem>
          <ItemList icon={<MovieIcon />} primaryText="Movie" items={['All movie', 'Upcoming movie', 'Favorite Moive']} links={["/", "/movies/upcoming", "/movies/favorites"]} />
          <ItemList icon={<LiveTvIcon />} primaryText="TV" items={["Today Airing TV", "Top rated TV", "Popular TV"]} links={["/tvs", "/tvs/toprate", "tvs/popular"]} />
          <ItemList icon={<VideoLibraryIcon />} primaryText="Collection" items={["List", "createList"]} links={["/list", "list/create"]} />
        </List>
        {isSearching && <h5>is Searching</h5>}
        <div className="mt-5">
          <Carousel items={medias} />
        </div>
      </Drawer>
    </>
  )
}

export default SideBar
