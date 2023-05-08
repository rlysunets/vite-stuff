import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { MagnifyingGlassIcon, ArrowLeftOnRectangleIcon, ArrowRightOnRectangleIcon } from '@heroicons/react/24/solid'
import { HeartIcon, ShoppingCartIcon } from '@heroicons/react/24/outline'

import logo from '../../images/logo.svg'
import avatar from '../../images/avatar.jpg'
import styles from "../../styles/Header.module.css"
import { logoutUser, toggleForm } from '../../redux/slices/userSlise'
import { useGetProductsQuery } from '../../redux/slices/apiSlice'

const Header = () => {
   const dispatch = useDispatch()
   const navigate = useNavigate()
   const { totalCount, currentUser } = useSelector(state => state.user)
   const { favourites } = useSelector(state => state.products)

   const [searchValue, setSearchValue] = useState("")

   const { data } = useGetProductsQuery({ title: searchValue })

   const onClickHandle = () => {
      if (!currentUser) {
         dispatch(toggleForm(true))
      } else {
         navigate("/profile")
      }
   }

   const onClickLogout = () => {
      dispatch(logoutUser())
   }

   const onChangeHandle = (e) => {
      setSearchValue(e.target.value)
   }

   return (
      <div className={styles.header}>
         <div className={styles.logo}>
            <Link to={"/"}>
               <img src={logo} alt="logo image" />
            </Link>
         </div>

         <div className={styles.info}>
            <form className={styles.form}>
               <div className={styles.icon}>
                  <MagnifyingGlassIcon />
               </div>

               <div className={styles.input}>
                  <input
                     type="search"
                     name="search"
                     placeholder="Search ..."
                     value={searchValue}
                     autoComplete="off"
                     onChange={onChangeHandle}
                  />
               </div>

               {searchValue &&
                  <div className={styles.box}>
                     {!data.length ? "No results" : (
                        data.map(item => (
                           <Link to={`/products/${item.id}`} key={item.id} className={styles.item} onClick={() => setSearchValue("")}>
                              <div className={styles.image} style={{ backgroundImage: `url(${item.images[0]})` }} />
                              <div className={styles.itemInfo}>
                                 <p>{item.title}</p>
                                 <p>{item.price}$</p>
                              </div>
                           </Link>
                        ))
                     )}
                  </div>}
            </form>

            <div className={styles.account}>
               <Link to={"/favourites"} className={styles.cart}>
                  <HeartIcon />
                  {favourites?.length ? <div className={styles.count}>{favourites.length}</div> : <></>}
               </Link>

               <Link to={"/cart"} className={styles.cart}>
                  <ShoppingCartIcon />
                  {totalCount > 0 && <div className={styles.count}>{totalCount}</div>}
               </Link>

               <div className={styles.user} onClick={onClickHandle}>
                  <div className={styles.avatar}>
                     <img src={currentUser ? currentUser.avatar : avatar} alt="logo image" />
                  </div>
                  <div className={styles.username}>
                     {currentUser ? currentUser.name : "Guest"}
                  </div>
               </div>

               <div className={styles.login}>
                  {currentUser ?
                     <ArrowLeftOnRectangleIcon title='log out' onClick={onClickLogout} />
                     :
                     <ArrowRightOnRectangleIcon title='log in' onClick={onClickHandle} />
                  }
               </div>
            </div>
         </div>
      </div>
   )
}

export default Header