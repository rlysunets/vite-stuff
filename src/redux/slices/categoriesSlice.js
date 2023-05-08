import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

const initialState = {
   list: [],
   isLoading: false
}

export const fetchCategories = createAsyncThunk(
   'categories/fetchCategories',
   async () => {
      const res = await axios("https://api.escuelajs.co/api/v1/categories")
      return res.data
   }
)

export const categoriesSlice = createSlice({
   name: 'categories',
   initialState,
   extraReducers: (builder) => {
      builder.addCase(fetchCategories.pending, (state) => {
         state.isLoading = true
      })
      builder.addCase(fetchCategories.fulfilled, (state, action) => {
         state.list = action.payload.slice(0, 5)
         state.isLoading = false
      })
      builder.addCase(fetchCategories.rejected, (state) => {
         state.isLoading = false
      })
   },
})

export default categoriesSlice.reducer