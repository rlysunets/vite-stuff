import { getTotalCount } from "./getTotalCount"
import { getTotalPrice } from "./getTotalPrice"

export const getLocalStorage = () => {
   const data = window.localStorage.getItem("cart")
   const items = data ? JSON.parse(data) : []
   const totalCount = getTotalCount(items)
   const totalPrice = getTotalPrice(items)

   return { items, totalCount, totalPrice }
}