import React from 'react';
import {useState}from 'react';
import {useDispatch} from 'react-redux';
import {getNameGames}from '../../actions';
import styles from '../Styles/SearchBar.module.css'

export default function SearBar({setCurrentPage}){
  const dispatch= useDispatch()
  const [name,setName]= useState("")

function handleInputChange(e){
    e.preventDefault()
    setName (e.target.value)
}
function handleSubmit (e){
    e.preventDefault()
    dispatch(getNameGames(name))
    setName("")
    setCurrentPage(1);
}

return(

<div className={styles.container}>
    
    <input className={styles.input} onChange={(e)=> handleInputChange (e)} type="text" value={name} placeholder='Ingrese un nombre'/>
    <button className={styles.btn} onClick={(e)=>handleSubmit(e)} type='submit' >BUSCAR</button>

</div>
    )

}