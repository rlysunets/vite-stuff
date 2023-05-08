import React, { useState } from 'react'
import { XMarkIcon, } from '@heroicons/react/24/solid'
import { useDispatch } from 'react-redux'

import styles from "../../styles/User.module.css"
import { createUser, toggleForm, toggleFormType } from '../../redux/slices/userSlise'

const SignUpForm = () => {
   const dispatch = useDispatch()
   const [values, setValues] = useState({
      name: "",
      email: "",
      password: "",
      avatar: ""
   })

   const onChangehandler = (e) => {
      setValues({ ...values, [e.target.name]: e.target.value })
   }

   const onCloseForm = () => {
      dispatch(toggleForm(false))
   }

   const submitForm = (e) => {
      e.preventDefault()

      dispatch(createUser(values))
      dispatch(toggleForm(false))
   }

   return (
      <>
         <div className={styles.overlay} onClick={onCloseForm} />
         <div className={styles.wrapper}>
            <div className={styles.close} onClick={onCloseForm}>
               <XMarkIcon />
            </div>

            <div className={styles.title}>Sign Up</div>
            <form className={styles.form} onSubmit={submitForm}>
               <div className={styles.group}>
                  <input
                     type="email"
                     placeholder="Your email..."
                     name="email"
                     value={values.email}
                     onChange={onChangehandler}
                     required
                  />
               </div>
               <div className={styles.group}>
                  <input
                     type="name"
                     placeholder="Your name..."
                     name="name" value={values.name}
                     onChange={onChangehandler}
                     required
                  />
               </div>
               <div className={styles.group}>
                  <input
                     type="password"
                     placeholder="Your password..."
                     name="password"
                     value={values.password}
                     onChange={onChangehandler}
                     required
                  />
               </div>
               <div className={styles.group}>
                  <input
                     type="avatar"
                     placeholder="Your avatar..."
                     name="avatar"
                     value={values.avatar}
                     onChange={onChangehandler}
                     required
                  />
               </div>

               <div className={styles.link} onClick={() => dispatch(toggleFormType())}>I already have an acount</div>

               <button type="submit" className={styles.submit}>Create an acount</button>
            </form>
         </div>
      </>
   )
}

export default SignUpForm