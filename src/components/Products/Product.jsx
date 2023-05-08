import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { HeartIcon } from '@heroicons/react/24/outline'

import styles from "../../styles/Product.module.css"
import { addItemToCart } from '../../redux/slices/userSlise'
import { toggleFavourite } from '../../redux/slices/productsSlice'

const SIZES = [4, 4.5, 5]

const Product = (item) => {
   const dispatch = useDispatch()
   const [currentImage, setCurrentImage] = useState()
   const [currentSize, setCurrentSize] = useState()

   const onAddToCart = () => {
      dispatch(addItemToCart(item))
   }

   const onClickFavourite = () => {
      dispatch(toggleFavourite(item))
   }

   useEffect(() => {
      window.scroll(0, 0)

      setCurrentImage(item.images[0])
      setCurrentSize(SIZES[0])
   }, [item])

   return (
      <section className={styles.product}>
         <div className={styles.images}>
            <div className={styles.current} style={{ backgroundImage: `url(${currentImage})` }} />
            <div className={styles.imagesList}>
               {item?.images?.map(image => (
                  <div
                     key={image}
                     className={styles.image}
                     style={{ backgroundImage: `url(${image})` }}
                     onClick={() => setCurrentImage(image)}
                  />
               ))}
            </div>
         </div>

         <div className={styles.info}>
            <h1 className={styles.title}>{item.title}</h1>
            <div className={styles.price}>{item.price} $</div>
            <div className={styles.color}>
               <span>Color:</span> Green
            </div>
            <div className={styles.sizes}>
               <span>Sizes:</span>

               <div className={styles.list}>
                  {SIZES.map((size) => (
                     <div
                        onClick={() => setCurrentSize(size)}
                        className={`${styles.size} ${currentSize === size ? styles.active : ""}`}
                        key={size}
                     >
                        {size}
                     </div>
                  ))}
               </div>
            </div>
            <p className={styles.description}>{item.description}</p>
            <div className={styles.actions}>
               <button
                  className={styles.add}
                  onClick={onAddToCart}
               >
                  Add to Cart
               </button>
               <button
                  className={styles.add}
                  onClick={onClickFavourite}
               >
                  <HeartIcon />
               </button>
            </div>
            <div className={styles.bottom}>
               <div className={styles.purchase}>19 people purchased</div>
               <Link to="/">Return to store</Link>
            </div>
         </div>
      </section>
   )
}

export default Product