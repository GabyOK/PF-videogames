import React from 'react';
import styles from '../Styles/Card.module.css'

export default function Card({name, image, genres , rating }){
   
  return(

<div className={styles.card}>
    <div className={styles.card2}>
    <img className={styles.image} src={image} alt="Imagen no encontrada" width='290px' height='200px' /> 
    
    <div>
    <h5 className={styles.rating}> Rating<br/>⭐{rating} </h5>
    </div>
    
    <div>
    <h5 className={styles.name}>{name.toUpperCase()}</h5>
    </div>
    
    <div>
    <h5 className={styles.genres}> GENEROS</h5>
{genres.map((element, index) => {
    return (
<h6 className={styles.items}  key={index}> {element.name ? element.name.toUpperCase() : element.toUpperCase() } </h6>
    );
})}

    </div>
  </div>
</div>
 )
}

