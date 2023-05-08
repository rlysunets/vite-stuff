import React, { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate, useParams } from "react-router-dom"

import { getRelatedProducts } from "../../redux/slices/productsSlice"
import { useGetProductByIdQuery } from "../../redux/slices/apiSlice"

import Product from "./Product"
import Products from "./Products"

const SingleProduct = () => {
   const dispatch = useDispatch()

   const { id } = useParams()
   const navigate = useNavigate()

   const { list, related } = useSelector(state => state.products)

   const { data, isLoading, isFetching, isSuccess } = useGetProductByIdQuery(id)

   useEffect(() => {
      if (!isFetching && !isLoading && !isSuccess) {
         navigate("/")
      }
   }, [isLoading, isFetching, isSuccess])

   useEffect(() => {
      if (!data || !list.length) return

      dispatch(getRelatedProducts(data.category.id))
   }, [data, list.length])

   return (
      <>
         {data &&
            <>
               <Product {...data} />
               <Products list={related} title="Related products" />
            </>}
      </>
   )
}

export default SingleProduct