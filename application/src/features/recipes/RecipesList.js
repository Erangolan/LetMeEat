/* eslint-disable no-unused-vars */
import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles';
import ImageList from '@material-ui/core/ImageList';
import ImageListItem from '@material-ui/core/ImageListItem';
import ImageListItemBar from '@material-ui/core/ImageListItemBar';
import InfoIcon from '@material-ui/icons/Info';
import { selectAllRecipes, fetchRecipes, deleteRecipe } from './RecipesSlice'

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    backgroundColor: theme.palette.background.paper,
  },
  imageList: {
    width: 750,
    height: 675,
  },
  icon: {
    color: 'rgba(255, 255, 255, 0.54)',
  },
}));

export const RecipesList = () => {
  const classes = useStyles()
  const dispatch = useDispatch()
  const recipes = useSelector(selectAllRecipes)
  console.log('recipes: ', recipes)

  const recipesStatus = useSelector((state) => state.recipes.status)
  const error = useSelector((state) => state.recipes.error)

  useEffect(() => {
    if (recipesStatus === 'idle') {
      dispatch(fetchRecipes())
    }
  }, [recipesStatus, dispatch])

  // const clickHandle = (id) => {
  //   dispatch(deleteRecipe(id))
  // }

  let content
  if (recipesStatus === 'loading') {
    content = <div className="loader">Loading...</div>
  } else if (recipesStatus === 'succeeded') {
    content = <div className={classes.root}>
      <ImageList rowHeight={300} cols={2} style={{ height: 'auto' }} className={classes.imageList}>
        {recipes.map((item) => (
          <ImageListItem key={item.id}>
            <img src={item.image} alt={item.title} />
            <ImageListItemBar
              title={item.title}
              actionIcon={
                <div>
                  <Link to={`/recipes/${item.id}`} className="button muted-button">
                    <InfoIcon />
                  </Link>
                </div>
              }
            />
          </ImageListItem>
        ))}
      </ImageList>
    </div>
  } else if (recipesStatus === 'failed') {
    content = <div>{error}</div>
  }

  return (
    <section className="posts-list">
      <h2>recipes</h2>
      {content}
    </section>
  )
}
