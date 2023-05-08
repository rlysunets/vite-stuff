import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import toast from 'react-hot-toast'
import axios from 'axios'

import { setLocalStorage } from '../../utils/setLocalStorage'

const initialState = {
   list: [],
   filtered: [],
   related: [],
   favourites: localStorage.getItem("favourites") ? JSON.parse(localStorage.getItem("favourites")) : [],
   isLoading: false
}

export const fetchProducts = createAsyncThunk(
   'products/fetchProducts',
   async () => {
      const res = await axios("https://api.escuelajs.co/api/v1/products")
      return res.data.map(el => ({ ...el, isFav: false }))
   }
)

export const productsSlice = createSlice({
   name: 'products',
   initialState,
   reducers: {
      getFilteredByPrice: (state) => {
         state.filtered = state.list.filter(el => el.price < 100)
      },
      getRelatedProducts: (state, action) => {
         state.related = state.list.filter(item => item.category.id == action.payload)
      },
      toggleFavourite: (state, action) => {
         const find = state.favourites.find(item => item.id === action.payload.id)

         if (!find) {
            toast.success(`${action.payload.title} added to favourites`, { duration: 3000 })
            state.favourites.push(action.payload)
         } else {
            toast.success(`${action.payload.title} removed from favourites`, { duration: 3000 })
            state.favourites = state.favourites.filter(el => el.id !== action.payload.id)
         }

         setLocalStorage("favourites", state.favourites)
      },
   },
   extraReducers: (builder) => {
      builder.addCase(fetchProducts.pending, (state) => {
         state.isLoading = true
      })
      builder.addCase(fetchProducts.fulfilled, (state, action) => {
         state.list = action.payload
         state.isLoading = false
      })
      builder.addCase(fetchProducts.rejected, (state) => {
         state.isLoading = false
      })
   },
})

export const { getFilteredByPrice, getRelatedProducts, toggleFavourite } = productsSlice.actions

export default productsSlice.reducer