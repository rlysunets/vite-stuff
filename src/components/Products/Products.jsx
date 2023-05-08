import React from 'react'

import { Swiper, SwiperSlide } from 'swiper/react'
import { Controller, Autoplay, Navigation } from 'swiper'
import 'swiper/css'
import 'swiper/css/navigation'

import styles from "../../styles/Products.module.css"
import { Link } from 'react-router-dom'


const Products = ({ title, list }) => {
   return (
      <section className={styles.products}>
         {title && <h2>{title}</h2>}

         {list?.length ?
            (<Swiper
               className={styles.list}
               controller={{ control: true }}
               modules={[Controller, Autoplay, Navigation]}
               navigation
               spaceBetween={20}
               loop={true}
               autoplay={{ delay: 4000 }}
               breakpoints={{
                  100: {
                     slidesPerView: 1,
                  },
                  500: {
                     slidesPerView: 2,
                  },
                  767: {
                     slidesPerView: 3,
                  },
                  1200: {
                     slidesPerView: 4,
                  },
                  1700: {
                     slidesPerView: 5,
                  },
               }}
            >
               {list?.map(({ id, images, title, category, price }) => (
                  <SwiperSlide key={id}>
                     <Link to={`/products/${id}`} className={styles.product}>
                        <div className={styles.image}>
                           <img src={images[0]} alt="image" className={styles.img} />
                        </div>
                        <div className={styles.wrapper}>
                           <h3 className={styles.title}>{title}</h3>
                           <div className={styles.cat}>{category.name}</div>
                           <div className={styles.info}>
                              <div className={styles.prices}>
                                 <div className={styles.price}>{price}$</div>
                                 <div className={styles.oldPrice}>{Math.floor(price * 1.2)}$</div>
                              </div>
                              <div className={styles.purchases}>111 purchased</div>
                           </div>
                        </div>
                     </Link>
                  </SwiperSlide>
               ))}
            </Swiper>)
            :
            (
               <div className={styles.empty}>Here is empty :&#40;</div>
            )
         }
      </section>
   )
}

export default Products