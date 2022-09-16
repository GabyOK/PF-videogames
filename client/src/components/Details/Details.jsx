import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getDetails , resetDetail } from "../../actions";
import { useEffect } from "react";
import { useParams } from "react-router";
import styles from '../Styles/Details.module.css'


export default function Detail (props) {
    console.log(props)
const dispatch = useDispatch()
const {id} = useParams()

useEffect(() => {
  dispatch(resetDetail())
  dispatch(getDetails(id))
},[dispatch, id])
   
const  detail = useSelector ((state) => state.detail)

return (
  <div className={styles.contenedor}>
    <div className={styles.container}>

  {detail.length > 0 ? (
  <div className={styles.fondo}>
    <h1 className={styles.nombre} >{detail[0].name}</h1>
    <img className={styles.image} src={detail[0].image} alt="Imagen no encontrada" width="25px" height="250px"/>
  <div >

    <h5 className={styles.rating}>RATING ⭐ {detail[0].rating}</h5>
     
    <h5>GENEROS  </h5>
    <p>{detail[0].genres.map(el=>el.name).join("||")}</p>

    <h5>PLATAFORMAS </h5>
    <p>{detail[0].platform && detail[0].platform.join(" - ")}</p>  

    <p>{detail[0].description}</p>

    <h4>Fecha de Lanzamiento</h4>
    <h5>{detail[0].released}</h5>


    <Link to= '/home'><button className={styles.regresar}>REGRESAR</button></Link>
  </div>
  
</div>
   ) : (

<div className={styles.detail}>

    <h1 className={styles.name} >{detail.name}</h1>
    <img className={styles.img} src={detail.image} alt="Imagen no encontrada" width="250px" height="250px"/>
    <div >

    <h4 className={styles.ratiing}>RATING⭐{detail.rating}</h4>
 
     <h5>GENEROS</h5>
     <p>{detail.genres && detail.genres.join("||")}</p>

     <h5>PLATAFORMAS </h5>
     <p>{detail.platform && detail.platform.join(" - ")}</p>

      <p dangerouslySetInnerHTML={{ __html: detail.description }} />

      <h4>Fecha de Lanzamiento</h4>
      <h5 className={styles.fecha}>{detail.released}</h5>


    </div>

    <div >
    <Link to= '/home'>
      <button className={styles.btn}>REGRESAR</button>
      </Link>
    </div> 
    
    </div>
        
  )}
 </div>
 </div>
  )
}
 


/*<div className={styles.contenedor}>
    <div className={styles.container}>

  {detail.length > 0 ? (
  <div className={styles.fondo}>
    <h1 className={styles.nombre} >{detail[0].name}</h1>
    <img className={styles.image} src={detail[0].image} alt="Imagen no encontrada" width="25px" height="250px"/>
  <div >

    <h5 className={styles.rating}>RATING ⭐ {detail[0].rating}</h5>
     
    <h5>GENEROS  </h5>
    <p>{detail[0].genres.map(el=>el.name).join("||")}</p>

    <h5>PLATAFORMAS </h5>
    <p>{detail[0].platform && detail[0].platform.join(" - ")}</p>  

    <p>{detail[0].description}</p>

    <h4>Fecha de Lanzamiento</h4>
    <h5>{detail[0].released}</h5>


    <Link to= '/home'><button className={styles.regresar}>REGRESAR</button></Link>
  </div>
  
</div>
   ) : (

<div className={styles.detail}>

    <h1 className={styles.name} >{detail.name}</h1>
    <img className={styles.img} src={detail.image} alt="Imagen no encontrada" width="250px" height="250px"/>
    <div >

    <h4 className={styles.ratiing}>RATING⭐{detail.rating}</h4>
 
     <h5>GENEROS</h5>
     <p>{detail.genres && detail.genres.join("||")}</p>

     <h5>PLATAFORMAS </h5>
     <p>{detail.platform && detail.platform.join(" - ")}</p>

      <p dangerouslySetInnerHTML={{ __html: detail.description }} />

      <h4>Fecha de Lanzamiento</h4>
      <h5 className={styles.fecha}>{detail.released}</h5>


    </div>

    <div >
    <Link to= '/home'>
      <button className={styles.btn}>REGRESAR</button>
      </Link>
    </div> 
    
    </div>
        
  )}
 </div>
 </div>
    */