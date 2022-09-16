import React ,{ useState , useEffect } from 'react';
import { Link }from 'react-router-dom';
import {useDispatch , useSelector}from 'react-redux';
import getAllVideoGames   from '../../actions';
import {orderByGames, orderByRating , getAllGenres , filterByGenres ,filterCreated} from '../../actions';
import Card from '../Card/Card';
import Paginado from '../Paginado/Paginado';
import SearchBar from '../SearchBar/SearchBar';
import styles from '../Styles/Home.module.css'


export default function Home (){
const dispatch = useDispatch()
const allGames = useSelector ((state) => state.videoGames ) 
const allGenres =useSelector ((state)=>state.genres)


//---------------PAGINADO--------------- 
const [currentPage, setCurrentPage] = useState(1) 
const [gamesPage, setGamesPage] = useState (15) 
const indexOfLastGame = currentPage * gamesPage 
const indexOfFirstGames = indexOfLastGame - gamesPage 
const currentVideoGames = allGames.slice(indexOfFirstGames , indexOfLastGame)
const [orden ,setOrden] = useState('')

const paginado =(pageNumber)=>{ 
  setCurrentPage(pageNumber)
}

useEffect(()=>{
dispatch (getAllVideoGames())
dispatch(getAllGenres())
},[dispatch])

function handleClick(e){
  e.preventDefault(); 
  dispatch(getAllVideoGames()); 
  }

function handleSort(e){
e.preventDefault();
dispatch(orderByGames(e.target.value))
setCurrentPage(1)
setOrden(`Ordenado ${e.target.value}`)
}

function handleOrderRating(e){
  e.preventDefault();
  setCurrentPage(1)
  dispatch(orderByRating(e.target.value))
  setOrden(`Ordenado ${e.target.value}`) 
}
function handleFilterGenres(e){
  e.preventDefault();
  setCurrentPage(1)
  dispatch(filterByGenres(e.target.value))

}
function handleFilterCreated(e){
 console.log(e.target.value)
  dispatch(filterCreated(e.target.value))
  setCurrentPage(1)
  setOrden(`Ordenado ${e.target.value}`)
 
}

  return(
<div className={styles.container}>
       
      <SearchBar setCurrentPage={setCurrentPage}/>
     <Link  to='/Videogames'> <button className={styles.link}> CREA TU VIDEO JUEGO</button></Link>
     <button className={styles.actualizar} onClick={e => { handleClick(e) }}>Actualizar</button>

  <div>
      <select className={styles.orden} onChange={e => { handleSort(e) }}>
        <option >ORDEN</option>
        <option value='Asc'>ASCENDENTE A-Z</option>
        <option value='Desc'>DESCENDENTE Z-A</option>
      </select>

      <select className={styles.rating} onChange={e => { handleOrderRating(e) }}>
       <option >ORDEN POR RATING</option>
       <option value='Max'>RATING MAX</option>
       <option value='Min'>RATING MIN</option>
      </select>

      <select className={styles.genres} onChange={e => { handleFilterGenres(e) }}> 
      <option value='Todos'>GENEROS</option>
        {
        allGenres.map((genero , i) => (
          <option key={i} value={genero.name}>{genero.name}</option>
        ))}
      </select>

      <select className={styles.created} onChange={e => { handleFilterCreated(e) }} >
            <option value='all'>TODOS</option>
            <option value='api'>EXISTENTES</option>  
            <option value='db'>CREADOS</option>                     
        </select>

  {
   currentVideoGames[0]? currentVideoGames.map((el,i) =>{
    return (
      <Link to={"/videogame/" + el.id} key={i} >
    <Card 
    key ={el.id}
    name={el.name} 
    image={el.image} 
    rating={el.rating}
    genres={el.genres}
  
    />

    </Link>
    )
    })
    :<h1 className={styles.cargando}>CARGANDO...</h1>
  }
    <Paginado
      gamesPage = {gamesPage}
      allGames = {allGames.length}
      paginado={paginado}
      
    /> 

  </div>

  </div>
    )
}