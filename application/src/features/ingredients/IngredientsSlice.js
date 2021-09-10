import {
  createSlice,
  createAsyncThunk,
  createEntityAdapter,
} from '@reduxjs/toolkit'

const ingredientsAdapter = createEntityAdapter()

const initialState = ingredientsAdapter.getInitialState({
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
  extraReducers(builder) {
    builder
      .addCase(fetchIngredients.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(fetchIngredients.fulfilled, (state, action) => {
        state.status = 'succeeded'
        ingredientsAdapter.upsertMany(state, action.payload)
      })
      .addCase(fetchIngredients.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message
      })
  },
})

export default ingredientsSlice.reducer
export const { formUpdated } = ingredientsSlice.actions

export const {
  selectAll: selectAllIngredients,
} = ingredientsAdapter.getSelectors((state) => state.ingredients)

export const selectContent = (state) => state.ingredients.content
