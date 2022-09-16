import React from 'react';
import styles from '../Styles/Paginado.module.css'

export default function Paginado ({gamesPage,allGames, paginado}){ 
const pageNumber = []

for(let i =1; i<= Math.ceil(allGames / gamesPage); i ++){ //7paginas
    pageNumber.push (i)
}
  return (
	<nav >
	  <ul className={styles.ul}>
		{pageNumber && pageNumber.map((number) => {
            
	return (
	<li className={styles.li} key={number}>
		<button className={styles.pageNumbers}  onClick={() => paginado(number)}>{number} </button>
	</li>

);
})}
   </ul>
</nav>
	);
}