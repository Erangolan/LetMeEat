import { configureStore } from '@reduxjs/toolkit'
import ingredientsReducer from '../features/ingredients/IngredientsSlice'
import recipesReducer from '../features/recipes/RecipesSlice'
import userReducer from '../features/users/userSlice'

export default configureStore({
  reducer: {
    ingredients: ingredientsReducer,
    recipes: recipesReducer,
    user: userReducer,
  },
})
