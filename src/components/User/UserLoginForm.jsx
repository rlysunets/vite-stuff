import React, { useState } from 'react'
import { XMarkIcon, } from '@heroicons/react/24/solid'
import { useDispatch } from 'react-redux'

import styles from "../../styles/User.module.css"
import { loginUser, toggleForm, toggleFormType } from '../../redux/slices/userSlise'

const UserLoginForm = () => {
   const dispatch = useDispatch()
   const [values, setValues] = useState({
      email: "",
      password: "",
   })

   const onChangehandler = (e) => {
      setValues({ ...values, [e.target.name]: e.target.value })
   }

   const onCloseForm = () => {
      dispatch(toggleForm(false))
   }

   const submitForm = (e) => {
      e.preventDefault()

      dispatch(loginUser(values))
      dispatch(toggleForm(false))
   }
   return (
      <>
         <div className={styles.overlay} onClick={onCloseForm} />
         <div className={styles.wrapper}>
            <div className={styles.close} onClick={onCloseForm}>
               <XMarkIcon />
            </div>

            <div className={styles.title}>Login</div>
            <form className={styles.form} onSubmit={submitForm}>
               <div className={styles.group}>
                  <input type="email" placeholder="Your email..." name="email" value={values.email} onChange={onChangehandler} required />
               </div>

               <div className={styles.group}>
                  <input type="password" placeholder="Your password..." name="password" value={values.password} onChange={onChangehandler} required />
               </div>

               <div className={styles.link} onClick={() => dispatch(toggleFormType())}>Create an acount</div>

               <button type="submit" className={styles.submit}>Login</button>
            </form>
         </div>
      </>
   )
}

export default UserLoginForm