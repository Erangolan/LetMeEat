import { configureStore } from '@reduxjs/toolkit'
import ingredientsReducer from '../features/ingredients/IngredientsSlice'

export default configureStore({
  reducer: {
    // recipes: recipesReducer,
    ingredients: ingredientsReducer,
  },
})
