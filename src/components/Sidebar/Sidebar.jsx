import React from 'react'
import { NavLink } from 'react-router-dom'
import { useSelector } from "react-redux"

import styles from "../../styles/Sidebar.module.css"

const Sidebar = () => {
   const { list } = useSelector(state => state.categories)

   return (
      <section className={styles.sidebar}>
         <div className={styles.title}>CATEGIRIES</div>
         <nav>
            <ul className={styles.menu}>
               {list.map(item => (
                  <li key={item.id}>
                     <NavLink
                        to={`/categories/${item.id}`}
                        className={({ isActive }) => `${styles.link} ${isActive ? styles.active : ""}`}
                     >
                        {item.name}
                     </NavLink>
                  </li>
               ))}
            </ul>
         </nav>

         <div className={styles.footer}>
            <a href="/help" target="_blank" className={styles.link}>
               Help
            </a>
            <a href="/terms" target="_blank" className={styles.link} style={{ textDecoration: "underline" }}>
               Terms & Conditions
            </a>
         </div>
      </section>
   )
}

export default Sidebar