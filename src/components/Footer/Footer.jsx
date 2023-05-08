import React from 'react'
import { Link } from 'react-router-dom'

import logo from '../../images/logo.svg'
import facebook from '../../images/facebook.svg'
import youtube from '../../images/youtube.svg'
import instagram from '../../images/instagram.svg'
import styles from "../../styles/Footer.module.css"

const Footer = () => {
   return (
      <section className={styles.footer}>
         <div className={styles.logo}>
            <Link to={"/"}>
               <img src={logo} alt="logo image" />
            </Link>
         </div>

         <div className={styles.rights}>
            developed by
            <a href="https://www.linkedin.com/in/roman-lysunets-21b166225/" target="_blank"> R. Lysunets</a>
         </div>

         <div className={styles.socials}>
            <a href="https://www.youtube.com/" target="_blank" rel="noreferrer" className={styles.icon}>
               <img src={youtube} alt="youtube icon" />
            </a>
            <a href="https://www.facebook.com/" target="_blank" rel="noreferrer" className={styles.icon}>
               <img src={facebook} alt="facebook icon" />
            </a>
            <a href="https://www.instagram.com/" target="_blank" rel="noreferrer" className={styles.icon}>
               <img src={instagram} alt="instagram icon" />
            </a>
         </div>
      </section>
   )
}

export default Footer