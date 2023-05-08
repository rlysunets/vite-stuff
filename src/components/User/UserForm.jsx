import React from 'react'
import { useSelector } from 'react-redux'

import SignUpForm from './SignUpForm'
import UserLoginForm from './UserLoginForm'

const UserForm = () => {
   const { showForm, formType } = useSelector(state => state.user)

   return (
      <>
         {showForm && formType === "signup" && <SignUpForm />}
         {showForm && formType === "login" && <UserLoginForm />}
      </>
   )
}

export default UserForm