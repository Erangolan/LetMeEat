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
          // 'token': localStorage.getItem('user'),
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
      .addCase(fetchMyRecipes.fulfilled, (state, action) => {
        state.status = 'succeeded'
        console.log(action.payload)
        usersAdapter.upsertMany(state.users.recipes, action.payload)
      })
      .addCase(deleteRecipe.fulfilled, (state, action) => {
        state.status = 'succeeded'
        usersAdapter.removeOne(state, action.payload)
      })
  },
})

// export const selectAllRecipes = (state) => state.users.recipes

export default userSlice.reducer

export const {
  selectAll: selectAllRecipes,
} = usersAdapter.getSelectors((state) => state.users)
