import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  data: [],
  loading: false,
  error: null,
}

const ingredientSlice = createSlice({
  name: 'ingredientlist',
  initialState,
  reducers: {
    __getIngredientList(state, action) {
      state.data = action.payload
    },
  },
})

export const { __getIngredientList } = ingredientSlice.actions

export default ingredientSlice.reducer

