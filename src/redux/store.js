import { configureStore } from '@reduxjs/toolkit'

import categoriesSlice from './slices/categoriesSlice'
import productsSlice from './slices/productsSlice'
import { apiSlice } from './slices/apiSlice'
import userSlice from './slices/userSlise'

export const store = configureStore({
   reducer: {
      categories: categoriesSlice,
      products: productsSlice,
      user: userSlice,
      [apiSlice.reducerPath]: apiSlice.reducer,
   },
   middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(apiSlice.middleware),
})