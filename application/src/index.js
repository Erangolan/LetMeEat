/* eslint-disable no-unused-vars */
import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import store from './app/store'
import { Provider } from 'react-redux'
import { fetchIngredients } from './features/ingredients/IngredientsSlice'
import { fetchRecipes } from './features/recipes/RecipesSlice'

localStorage.clear()
store.dispatch(fetchIngredients())

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
)
