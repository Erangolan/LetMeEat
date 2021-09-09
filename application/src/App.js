/* eslint-disable no-unused-vars */
import React from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom'

import { Navbar } from './app/Navbar'

import { IngredientsList } from './features/ingredients/IngredientsList'
import { SearchForm } from './features/ingredients/SearchForm'
import { RecipesList } from './features/recipes/RecipesList'
import { SingleRecipePage } from './features/recipes/SingleRecipePage'
import { MyRecipes } from './features/users/MyRecipes'

function App() {
  return (
    <Router>
      <Navbar />
      <div className="App">
        <Switch>
          <Route
            exact
            path="/"
            render={() => (
              <React.Fragment>
                <SearchForm />
                <IngredientsList />
              </React.Fragment>
            )}
          />
          <Route exact path="/recipes" component={RecipesList} />
          <Route exact path="/recipes/:recipeId" component={SingleRecipePage} />
          <Route exact path="/users/recipes" component={MyRecipes} />
          <Redirect to="/" />
        </Switch>
      </div>
    </Router>
  )
}

export default App
