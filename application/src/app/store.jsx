import { configureStore } from '@reduxjs/toolkit'

import recipesReducer from '../features/recipes/RecipesSlice'
import ingredientsReducer from '../features/ingredients/IngredientsSlice'
import userSlice from '../features/users/userSlice'

export default configureStore({
  reducer: {
    recipes: recipesReducer,
    ingredients: ingredientsReducer,
    users: userSlice,
  },
})
