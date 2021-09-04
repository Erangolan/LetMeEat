import {
  createSlice,
  createAsyncThunk,
  createEntityAdapter,
} from '@reduxjs/toolkit'

const ingredientsAdapter = createEntityAdapter()

const initialState = ingredientsAdapter.getInitialState({
  ingredients: [],
  content: [],
  status: 'idle',
  error: null
})

export const fetchIngredients = createAsyncThunk(
  '/recipes/fetchIngredients', async () => {
    try {
      const res = await fetch('http://localhost:3000/recipes/randomIngredients', {
        'method': 'GET',
      })

      const { ingredients } = await res.json()

      return ingredients
    } catch(err) {
      console.log(err)
    }
  }
)

export const fetchByIngredients = createAsyncThunk(
  '/ingredients/fetchByIngredients', async (userText) => {
    try {
      const res = await fetch(`http://localhost:3000/recipes/getRecipeByIngredients?ingredients=${userText}`, {
        'method': 'GET',
      })

      const { results } = await res.json()

      console.log('results: ', results)

      return results
    } catch(err) {
      console.log(err)
    }
  }
)

const ingredientsSlice = createSlice({
  name: 'ingredients',
  initialState,
  reducers: {
    formUpdated(state, action) {
      const existing = state.content.find((item) => item === action.payload)
      if (!existing) {
        state.content = state.content.concat(action.payload)
      }
    },
  },
  extraReducers: {
    [fetchIngredients.pending]: (state) => {
      state.status = 'loading'
    },
    [fetchIngredients.fulfilled]: (state, action) => {
      state.status = 'succeeded'
      state.ingredients = state.ingredients.concat(action.payload)
    },
    [fetchIngredients.rejected]: (state, action) => {
      state.status = 'failed'
      state.error = action.error.message
    },
    [fetchIngredients.pending]: (state) => {
      state.status = 'loading'
    },
  },
})

export default ingredientsSlice.reducer

export const { formUpdated } = ingredientsSlice.actions

export const selectAllIngredients = (state) => state.ingredients.ingredients
export const selectContent = (state) => state.ingredients.content

export const selectRecipeById = (state, ingredientId) =>
  state.ingredients.ingredients.find(({ id }) => id === ingredientId)
