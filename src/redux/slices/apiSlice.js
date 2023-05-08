import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

const buildUrl = (params) => {
   let url = ""

   Object.entries(params).forEach(([key, value], i) => {
      const sign = !i ? "?" : "&"
      url += `${sign}${key}=${value}`
   })

   return url
}


export const apiSlice = createApi({
   reducerPath: 'apiSlice',
   baseQuery: fetchBaseQuery({ baseUrl: 'https://api.escuelajs.co/api/v1/products/' }),
   endpoints: (builder) => ({
      getProductById: builder.query({
         query: (id) => `${id}`,
      }),
      getProducts: builder.query({
         query: (params) => buildUrl(params),
      }),
   }),
})

export const { useGetProductByIdQuery, useGetProductsQuery } = apiSlice