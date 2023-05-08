import React, { useEffect } from 'react'
import { useDispatch, useSelector } from "react-redux"

import Poster from '../Poster/Poster'
import Products from '../Products/Products'
import Categories from '../Categories/Categories'
import Banner from '../Banner/Banner'

import { getFilteredByPrice } from '../../redux/slices/productsSlice'

const Home = () => {
   const dispatch = useDispatch()
   const { categories, products } = useSelector(state => state)

   useEffect(() => {
      if (!products.list.length) return

      dispatch(getFilteredByPrice())
   }, [dispatch, products.list.length])

   return (
      <>
         <Poster />
         <Products list={products.list} title="Trending" />
         <Categories list={categories.list} title="Worth seeing" />
         <Banner />
         <Products list={products.filtered} title="Less then 100$" />
      </>
   )
}

export default Home