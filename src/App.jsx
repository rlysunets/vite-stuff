import { useEffect } from "react"
import { Route, Routes } from "react-router-dom"
import { useDispatch } from "react-redux"
import { Toaster } from 'react-hot-toast';

import Home from "./components/Home/Home"
import Header from "./components/Header/Header"
import Footer from "./components/Footer/Footer"
import Sidebar from "./components/Sidebar/Sidebar"
import Cart from "./components/Cart/Cart"
import SingleProduct from "./components/Products/SingleProduct"
import Profile from "./components/Profile/Profile"
import UserForm from "./components/User/UserForm"
import SingleCategory from "./components/Categories/SingleCategory"
import Favourives from "./components/Favourites/Favourites"

import { fetchCategories } from './redux/slices/categoriesSlice'
import { fetchProducts } from "./redux/slices/productsSlice"

function App() {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchCategories())
    dispatch(fetchProducts())
  }, [])

  return (
    <div className="app">
      <Header />
      <UserForm />
      <Toaster />

      <main className="container">
        <Sidebar />
        <Routes>
          <Route index element={<Home />} />
          <Route path="/products/:id" element={<SingleProduct />} />
          <Route path="/categories/:id" element={<SingleCategory />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/favourites" element={<Favourives />} />
        </Routes>
      </main>
      <Footer />
    </div>
  )
}

export default App
