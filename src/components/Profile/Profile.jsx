import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"

import styles from "../../styles/Profile.module.css"
import { toggleForm, updateUser } from "../../redux/slices/userSlise";

const Profile = () => {
   const dispatch = useDispatch();
   const { currentUser } = useSelector(state => state.user)

   const [values, setValues] = useState({
      name: "",
      email: "",
      password: "",
      avatar: "",
   });

   useEffect(() => {
      if (!currentUser) return

      setValues(currentUser)
   }, [currentUser])

   const onChangehandler = (e) => {
      setValues({ ...values, [e.target.name]: e.target.value })
   }

   const submitForm = (e) => {
      e.preventDefault()

      dispatch(updateUser(values))
   }

   const onClickLSignUp = () => {
      dispatch(toggleForm(true))
   }

   return (
      <section className={styles.profile}>
         {!currentUser ? (
            <div className={styles.logout}>
               <h2>You need to Sign Up</h2>
               <button type="button" className={styles.submit} onClick={onClickLSignUp}>
                  Sign Up
               </button>
            </div>
         ) : (
            <form className={styles.form} onSubmit={submitForm}>
               <div className={styles.group}>
                  <input
                     type="email"
                     placeholder="Your email ..."
                     name="email"
                     value={values.email}
                     onChange={onChangehandler}
                     required
                  />
               </div>

               <div className={styles.group}>
                  <input
                     type="name"
                     placeholder="Your name ..."
                     name="name"
                     value={values.name}
                     onChange={onChangehandler}
                     required
                  />
               </div>

               <div className={styles.group}>
                  <input
                     type="password"
                     placeholder="Your password ..."
                     name="password"
                     value={values.password}
                     onChange={onChangehandler}
                     required
                  />
               </div>

               <div className={styles.group}>
                  <input
                     type="avatar"
                     placeholder="Your avatar ..."
                     name="avatar"
                     value={values.avatar}
                     onChange={onChangehandler}
                     required
                  />
               </div>

               <button type="submit" className={styles.submit}>
                  Update
               </button>
            </form>
         )}
      </section>
   )
}

export default Profile