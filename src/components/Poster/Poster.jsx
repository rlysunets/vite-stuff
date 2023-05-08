import React from 'react'
import { Link } from 'react-router-dom'

import styles from "../../styles/Home.module.css"
import bg from '../../images/computer.png'

const Poster = () => {
   return (
      <section className={styles.home}>
         <div className={styles.title}>BIG SALE 20%</div>
         <div className={styles.product}>
            <div className={styles.text}>
               <div className={styles.subtitle}>the bestseller of 2022</div>
               <h1 className={styles.head}>LENNON r2d2 with NVIDIA 5090TI</h1>
               <Link to={"/cart"}>
                  <button className={styles.button}>Shop Now</button>
               </Link>
            </div>
            <div className={styles.image}>
               <img src={bg} alt="poster" />
            </div>
         </div>
      </section>
   )
}

export default Poster