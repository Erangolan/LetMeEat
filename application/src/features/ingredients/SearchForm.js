/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { selectContent, formUpdated } from './IngredientsSlice'
import { makeStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import { InputBase } from '@material-ui/core'
import IconButton from '@material-ui/core/IconButton'
import MenuIcon from '@material-ui/icons/Menu'
import SearchIcon from '@material-ui/icons/Search'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import clsx from 'clsx'
import CssBaseline from '@material-ui/core/CssBaseline'

const drawerWidth = 240

const useStyles = makeStyles((theme) => ({
  root: {
    padding: '2px 4px',
    display: 'flex',
    alignItems: 'center',
    margin: 'auto',
    marginTop: '1%',
    width: 600,
  },
  input: {
    marginLeft: theme.spacing(1),
    flex: 1,
  },
  iconButton: {
    padding: 10,
  },
  divider: {
    height: 28,
    margin: 4,
  },
}));

export const SearchForm = () => {
  const classes = useStyles();
  const contents = useSelector(selectContent)
  const [content, setContent] = useState(contents)

  const dispatch = useDispatch()
  const onContentChanged = e => setContent(e.target.value)

  useEffect(() => {
    setContent(contents)
  }, [contents, dispatch])

  const onSaveRecipeClick = () => {
    // dispatch(fetchRecipesByIngredients(content))
    // dispatch(formUpdated(content))
    setContent('')
  }

  return (
    <Paper component="form" className={classes.root}>
      <IconButton className={classes.iconButton} aria-label="menu">
        <MenuIcon />
      </IconButton>
      <InputBase
        value={content}
        fullWidth
        className={classes.input}
        onChange={onContentChanged}
        placeholder="insert your groceries"
        inputProps={{ 'aria-label': 'search google maps' }}
      />
      <Link to={'/recipes'}>
        <IconButton type="submit" onClick={onSaveRecipeClick} className={classes.iconButton} aria-label="search">
          <SearchIcon />
        </IconButton>
      </Link>
    </Paper>
  )
}
