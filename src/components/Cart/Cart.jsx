import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { MinusIcon, PlusIcon, TrashIcon } from '@heroicons/react/24/solid'

import styles from "../../styles/Cart.module.css"
import { deleteItem, minusItem, plusItem, purchase } from '../../redux/slices/userSlise'

const Cart = () => {
   const dispatch = useDispatch()
   const { totalPrice, cartList } = useSelector(state => state.user)

   const onClickMinus = (id) => {
      dispatch(minusItem(id))
   }

   const onClickPlus = (id) => {
      dispatch(plusItem(id))
   }

   const onClickDelete = (id) => {
      dispatch(deleteItem(id))
   }

   const onClickPurchase = () => {
      dispatch(purchase())
   }

   return (
      <section className={styles.cart}>
         <h2 className={styles.title}>Your Cart</h2>

         {!cartList.length ? (
            <div className={styles.empty}>
               <div>Here is empty</div>
               <Link to={"/"}>
                  <button className={styles.button}>Back Home</button>
               </Link>
            </div>
         ) : (
            <>
               <div className={styles.list}>
                  {cartList.map(item => (
                     <div className={styles.item} key={item.id}>
                        <div className={styles.image} style={{ backgroundImage: `url(${item.images[0]})` }} />
                        <div className={styles.info}>
                           <h3 className={styles.name}>{item.title}</h3>
                           <div className={styles.category}>{item.category.name}</div>
                        </div>
                        <div className={styles.price}>{item.price}$</div>
                        <div className={styles.quantity}>
                           <div className={styles.minus} onClick={() => onClickMinus(item.id)}>
                              <MinusIcon />
                           </div>
                           <span className={styles}>{item.quantity}</span>
                           <div className={styles.plus} onClick={() => onClickPlus(item.id)}>
                              <PlusIcon />
                           </div>
                        </div>
                        <div className={styles.total}>{item.price * item.quantity}$</div>
                        <div className={styles.close} onClick={() => onClickDelete(item.id)}>
                           <TrashIcon />
                        </div>
                     </div>
                  ))}
               </div>
               <div className={styles.actions}>
                  <div className={styles.total}>
                     TOTAL PRICE: <span>{totalPrice}$</span>
                  </div>
                  <button className={styles.proceed} onClick={onClickPurchase}>Proceed to checkout</button>
               </div>
            </>
         )}
      </section>
   )
}

export default Cart