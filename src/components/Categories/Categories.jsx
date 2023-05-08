import React from 'react'
import { Link } from 'react-router-dom'

import styles from "../../styles/Categories.module.css"

const Categories = ({ title, list }) => {
   return (
      <section className={styles.section}>
         <h2>{title}</h2>
         <div className={styles.list}>
            {list?.map(item => (
               <Link to={`/categories/${item.id}`} key={item.id} className={styles.item}>
                  <div className={styles.image} style={{ backgroundImage: `url(${item.image})` }} />
                  <h3 className={styles.title}>{item.name}</h3>
               </Link>
            ))}
         </div>
      </section>
   )
}

export default Categories