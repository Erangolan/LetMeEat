import { configureStore } from '@reduxjs/toolkit'
import ingredientsReducer from '../features/ingredients/IngredientsSlice'
import recipesReducer from '../features/recipes/RecipesSlice'

export default configureStore({
  reducer: {
    ingredients: ingredientsReducer,
    recipes: recipesReducer,
  },
})
