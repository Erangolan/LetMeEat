import {
  createSlice,
  createAsyncThunk,
  createEntityAdapter,
} from '@reduxjs/toolkit'

const usersAdapter = createEntityAdapter()

const initialState = usersAdapter.getInitialState({
  recipes: [],
  status: 'idle',
  error: null,
})

export const fetchMyRecipes = createAsyncThunk(
  '/users/fetchMyRecipes', async () => {
    try {
      const res = await fetch('http://localhost:3000/recipes/myRecipes', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'token': localStorage.getItem('token'),
        },
      })
      const results = await res.json()

      return results
    } catch(err) {
      console.log(err)
    }
  }
)

export const deleteRecipe = createAsyncThunk(
  '/users/deleteRecipe', async (id) => {
    try {
      await fetch(`http://localhost:3000/recipes/delete?id=${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'token': localStorage.getItem('token'),
        },
      })

      return id
    } catch(err) {
      console.log(err)
    }
  }
)

const userSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchMyRecipes.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(fetchMyRecipes.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.recipes = action.payload
      })
      .addCase(fetchMyRecipes.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message
      })
      .addCase(deleteRecipe.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.recipes = state.recipes.filter(({ id }) => id !== action.payload)
      })
  },
})

export default userSlice.reducer

export const selectAllRecipes = (state) => state.users.recipes

// export const {
//   selectAll: selectAllRecipes,
// } = usersAdapter.getSelectors((state) => state.recipes)
