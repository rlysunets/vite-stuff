import React from 'react'
import { useSelector } from 'react-redux'

import Poster from '../Poster/Poster'
import Products from '../Products/Products'

const Favourites = () => {
   const { favourites } = useSelector(state => state.products)

   return (
      <>
         <Poster />
         <Products list={favourites} title={`Favourite products`} />
      </>
   )
}

export default Favourites