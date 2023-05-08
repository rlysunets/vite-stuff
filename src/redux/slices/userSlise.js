import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
import toast from 'react-hot-toast'

import { getTotalPrice } from '../../utils/getTotalPrice'
import { getTotalCount } from '../../utils/getTotalCount'
import { setLocalStorage } from '../../utils/setLocalStorage'
import { getLocalStorage } from '../../utils/getLocalStorage'

const { items, totalCount, totalPrice } = getLocalStorage()

const initialState = {
   currentUser: localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : null,
   cartList: items,
   totalPrice: totalPrice,
   totalCount: totalCount,
   isLoading: false,
   formType: "signup", // "login"
   showForm: false
}

export const createUser = createAsyncThunk(
   'user/createUser',
   async (payload) => {
      const res = await axios.post("https://api.escuelajs.co/api/v1/users", payload)
      setLocalStorage("user", res.data)
      return res.data
   }
)

export const loginUser = createAsyncThunk(
   'user/loginUser',
   async (payload) => {
      const res = await axios.post("https://api.escuelajs.co/api/v1/auth/login", payload)
      const login = await axios("https://api.escuelajs.co/api/v1/auth/profile", {
         headers: {
            Authorization: `Bearer ${res.data.access_token}`
         }
      })
      setLocalStorage("user", login.data)
      return login.data
   }
)

export const updateUser = createAsyncThunk(
   'user/updateUser',
   async (payload) => {
      const res = await axios.put(`https://api.escuelajs.co/api/v1/users/${payload.id}`, payload)
      setLocalStorage("user", res.data)
      return res.data
   }
)

export const userSlice = createSlice({
   name: 'user',
   initialState,
   reducers: {
      addItemToCart: (state, action) => {
         if (state.currentUser) {
            const find = state.cartList.find(item => item.id === action.payload.id)

            if (!find) {
               state.cartList.push({ ...action.payload, quantity: 1 })
            } else {
               find.quantity++
            }

            toast.success(`${action.payload.title} added to cart`, { duration: 3000 })
            setLocalStorage("cart", state.cartList)
            state.totalPrice = getTotalPrice(state.cartList)
            state.totalCount = getTotalCount(state.cartList)
         } else {
            toast.error(`You need to Sign Up`, { duration: 2000 })
            state.showForm = true
         }
      },
      minusItem: (state, action) => {
         state.cartList = state.cartList.map(el => {
            if (el.id === action.payload && el.quantity > 1) {
               el.quantity--
            }
            return el
         })
         setLocalStorage("cart", state.cartList)
         state.totalPrice = getTotalPrice(state.cartList)
         state.totalCount = getTotalCount(state.cartList)
      },
      plusItem: (state, action) => {
         state.cartList = state.cartList.map(el => {
            if (el.id === action.payload) {
               el.quantity++
            }
            return el
         })

         setLocalStorage("cart", state.cartList)
         state.totalPrice = getTotalPrice(state.cartList)
         state.totalCount = getTotalCount(state.cartList)
      },
      deleteItem: (state, action) => {
         state.cartList = state.cartList.filter(el => el.id !== action.payload)

         setLocalStorage("cart", state.cartList)
         state.totalPrice = getTotalPrice(state.cartList)
         state.totalCount = getTotalCount(state.cartList)
      },
      purchase: (state) => {
         state.cartList = []
         toast.success(`Thank you for your purchase! Our manager will contact you soon.`, { duration: 5000 })
         setLocalStorage("cart", state.cartList)
         state.totalPrice = getTotalPrice(state.cartList)
         state.totalCount = getTotalCount(state.cartList)
      },
      toggleForm: (state, action) => {
         state.showForm = action.payload
      },
      toggleFormType: (state) => {
         if (state.formType === "signup") {
            state.formType = "login"
         } else if (state.formType === "login") {
            state.formType = "signup"
         }
      },
      logoutUser: (state) => {
         localStorage.removeItem("user")
         state.currentUser = null
      }
   },
   extraReducers: (builder) => {
      builder.addCase(createUser.fulfilled, (state, action) => {
         state.currentUser = action.payload
      })
      builder.addCase(loginUser.fulfilled, (state, action) => {
         state.currentUser = action.payload
      })
      builder.addCase(updateUser.fulfilled, (state, action) => {
         state.currentUser = action.payload
      })
   },
})

export const { addItemToCart, toggleForm, toggleFormType, logoutUser, minusItem, plusItem, deleteItem, purchase } = userSlice.actions

export default userSlice.reducer