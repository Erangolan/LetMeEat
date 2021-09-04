/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { selectContent } from './IngredientsSlice'
// import { fetchRecipesByIngredients } from '../recipes/RecipesSlice'

export const SearchForm = () => {
  const contents = useSelector(selectContent)
  const [content, setContent] = useState(contents)

  const dispatch = useDispatch()

  const onContentChanged = e => setContent(e.target.value)

  useEffect(() => {
    setContent(contents)
  }, [contents, dispatch])

  const onSaveRecipeClick = () => {
    // dispatch(fetchRecipesByIngredients(content))
    setContent('')
  }

  return (
    <section>
      <h2>Add a New Recipe</h2>
      <form>
        <label htmlFor="postTitle">Recipe Title:</label>
        <input
          type="text"
          id="postTitle"
          name="postTitle"
          value={content}
          onChange={onContentChanged}
        />
        <Link to={'/recipes'} onClick={onSaveRecipeClick} className="button muted-button">
        get recipes
        </Link>
        <Link to={'/users/MyRecipes'} className="button muted-button">
        login
        </Link>
      </form>
    </section>
  )
}
