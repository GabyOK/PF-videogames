import React from 'react'
import {Link} from 'react-router-dom';
import styles from '../Styles/LandingPage.module.css'



export default function LandingPage (){
  return (
    <div className={styles.container}>
  
         <h1 className={styles.title}>APP DE VIDEOGAMES</h1>
    
         <Link to= '/home'>
         <button className={styles.button}>
              <span>INGRESAR</span><i></i>
          </button>
          
         </Link>

    </div>
    )
}