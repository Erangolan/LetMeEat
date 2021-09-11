import {
  createSlice,
  createAsyncThunk,
  createEntityAdapter,
} from '@reduxjs/toolkit'

const recipesAdapter = createEntityAdapter()

const initialState = recipesAdapter.getInitialState({
  status: 'idle',
  error: null,
})

export const fetchRecipes = createAsyncThunk(
  '/recipes/fetchRecipes', async (userText) => {
    try {
      console.log(userText)
      const res = await fetch('http://localhost:3000/recipes/randomRecipes')
      const { recipes } = await res.json()

      return recipes
    } catch(err) {
      console.log(err)
    }
  }
)

export const fetchRecipesByIngredients = createAsyncThunk(
  '/recipes/fetchRecipesByIngredients', async (userText) => {
    try {
      const res = await fetch(`http://localhost:3000/recipes/getRecipeByIngredients?ingredients=${userText}`)
      const results = await res.json()

      return results
    } catch(err) {
      console.log(err)
    }
  }
)

export const saveRecipe = createAsyncThunk(
  '/recipes/saveRecipe', async (recipe) => {
    try {
      const {
        id,
        title,
        ingredients,
        instructions,
        image,
      } = recipe
      await fetch(`http://localhost:3000/recipes/saverecipe?id=${id}`, {
        'method': 'POST',
        headers: {
          'Content-Type': 'application/json',
          'token': localStorage.getItem('token'),
        },
        body: JSON.stringify({
          id,
          title,
          ingredients,
          instructions,
          img: image,
        })
      })

      return id
    } catch(err) {
      console.log(err)
    }
  }
)

const recipesSlice = createSlice({
  name: 'recipes',
  initialState,
  reducers: {
  },
  extraReducers(builder) {
    builder
      .addCase(fetchRecipes.fulfilled, (state, action) => {
        state.status = 'succeeded'
        recipesAdapter.upsertMany(state, action.payload)
      })
  },
})

export default recipesSlice.reducer

export const {
  selectAll: selectAllRecipes,
  selectById: selectRecipeById,
} = recipesAdapter.getSelectors((state) => state.recipes)
