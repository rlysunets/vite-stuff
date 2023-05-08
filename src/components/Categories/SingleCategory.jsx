import React from 'react'
import { useParams } from 'react-router-dom'

import Poster from '../Poster/Poster'
import Products from '../Products/Products'
import { useGetProductsQuery } from '../../redux/slices/apiSlice'

const SingleCategory = () => {
   const { id } = useParams()
   const { data } = useGetProductsQuery({ categoryId: id })

   return (
      <>
         {data && <>
            <Poster />
            <Products list={data} title={`${data[0].category.name} products`} />
         </>}
      </>
   )
}

export default SingleCategory