import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  data: [],
  loading: false,
  error: null,
}

const foodSlice = createSlice({
  name: 'foodlist',
  initialState,
  reducers: {
    __getFoodList(state, action) {
      state.data = action.payload
    },
  },
})

export const { __getFoodList } = foodSlice.actions

export default foodSlice.reducer

