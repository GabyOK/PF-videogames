import React from 'react';
import {useState , useEffect} from 'react';
import {Link , useNavigate} from 'react-router-dom';
import {useDispatch , useSelector} from 'react-redux';
import {getAllGenres , postVideoGame} from '../../actions';
import styles from '../Styles/GameCreate.module.css'

function validate (input){
  let errors ={}
  if(!input.name){
    errors.name ='Se requiere un nombre';

 }else if(!input.name.match(/^[a-zA-Z_]+( [a-zA-Z_]+)*$/)){
    errors.name = 'Solo se permiten letras y sin espacios al final!';

 }else if(!input.image) {
  errors.image = "Inserte una imagen URL";

 }else if(!input.image.match(/^(ftp|http|https):\/\/[^ "]+$/)){
    errors.image = 'Se requiere una URL valida';
  
 }else if(!input.rating){
  errors.rating ='Se requiere un rating';
  
  }else if(input.genres && input.genres === 0){
  errors.genres = 'Seleccione al menos un genero';
  
  }else if(input.platform && input.platform === 0){
  errors.platform = 'Seleccione al menos un plataforma';  
  
  }else if (!input.description ){
  errors.description= 'Descripcion es requerida';
  
  }else if (input.description && input.description.length > 255 ){
  errors.description = 'La descripcion es muy larga.Max 255 caracteres';

  }else if (!input.released){
  errors.released = 'Se requiere una fecha';
  }
return errors;
}

export default function GameCreate(){
 const dispatch = useDispatch()
 const history = useNavigate() 
 const allGenres = useSelector ((state) => state.genres)
 const [error , setError]= useState ({})

 const [input ,setInput]= useState ({  
    name: "",
    image:"",
    rating: "",
    genres: [],
    platform: [],
    description: "",
    released: "",
 })

function handleChange(e){
   setInput({
    ...input,
    [e.target.name] : e.target.value
   })
   setError(validate({
    ...input,
    [e.target.name] : e.target.value
   }))
console.log(input)
 }

function handleCheck(e){
  if(e.target.checked){
    setInput({
     ...input,
     platform : [...input.platform ,e.target.value]  
    })
  }  
} 
function handleSelect (e){
 setInput({
    ...input,
    genres : [...input.genres, e.target.value]  
 })   
}
                
function handleDelete(el){
setInput({
  ...input, 
  genres : input.genres.filter(genero => genero !== el)  
})
}

function handleSubmit (e){
    e.preventDefault()
 console.log(input)
 dispatch(postVideoGame(input))   
 alert ('TU JUEGO FUE CREADO CON EXITO!!!')
 setInput({
    name: "",
    image:"",
    rating: "",
    genres: [],
    platform: [],
    description: "",
    released: "", 
 })
 history('/home');
}

useEffect(() => {
 dispatch(getAllGenres())   
},[dispatch])

let plataformas = [
    "Action",
    "Adventure",
    "Xbox One",
    "PlayStation 3",
    "PlayStation 4",
    "PlayStation 5",
    "Xbox 360",
    "Linux",
    "macOS",
    "PC",
    "Shooter",
    "Simulation",
    "Indie",
    "PC",
    "iOS",
    "Xbox Series S/X",
    "Android",
    "PS Vita",
    "Nintendo Switch",
    "Wii U"
  ]

 return (

  <div className={styles.container}>
    <div><Link to='/home'><button className={styles.regresar}>REGRESAR</button></Link></div>
     <div >
  
    <form className={styles.form} onSubmit={(e) => handleSubmit(e)}>
    <h1>CREA TU VIDEO JUEGO!</h1>
  <div>
    <label className={styles.nombre}>NOMBRE</label> <br />
    <input
    type="text"
    value={input.name}
    name='name' 
    onChange={(e)=>handleChange(e)}
    />
    {error.name && ( <p className={styles.error}> {error.name} </p> )}
 </div>
  
 <div>
    <label>IMAGEN</label> <br />
     <input 
     type="text"
     placeholder="URL de la imagen" 
     value={input.image}
     width="280px" 
     height="260px"
     name='image'
     onChange={(e)=>handleChange(e)} 
     />
     {error.image && ( <p className={styles.error}> {error.image} </p> )}
 </div>
   
 <div>
    <label>RATING</label> <br />
     <input 
     type="number"
     value={input.rating}
     name='rating' 
     max='6'
     min='1'
     onChange={(e)=>handleChange(e)}
     />
    {error.rating && ( <p className={styles.error}> {error.rating} </p> )}
</div>
  
<div> 
    <label>DESCRIPCION</label> <br />
     <textarea
     type="description"
     value={input.description}
     name='description' 
     placeholder='...'
     onChange={(e)=>handleChange(e)}
     />
     {error.description && ( <p className={styles.error}> {error.description} </p> )}
</div>

<div>
    <label>FECHA DE LANZAMIENTO</label> <br/>
     <input 
     type="date"
     value={input.released}
     name='released' 
     onChange={(e)=>handleChange(e)}
     />
     {error.released && ( <p className={styles.error}> {error.released} </p> )}
</div> <br />
 
<div>
<label >GENERO/S </label><br />
    <select onChange={(e)=>handleSelect(e)}  
    name="genres"
    type="text" >
      
{allGenres?.map((genre) => (
    <option value={genre.name} key={genre.name}>{genre.name}</option> 
     
  ))}  
    </select><br />
    {error.genres && ( <p> {error.genres} </p> )}
   
{input.genres.map(e =>
    <div className={styles.genres} key={e}>
    <h5>{e}</h5>
   
    <button className={styles.delete} onClick={()=> handleDelete(e)}>x</button> 
    </div>
  )}
</div>
  
<div className={styles.plataform}>
    <label >PLATAFORMA/S </label> 
    <div className={styles.items}> 
    {plataformas.map((e,i) => (
    <label className={styles.label} key={i}>
    <input
        type="checkbox"
        value={e}
        name="platform"
        onChange={(e)=>handleCheck(e)}   
        />
     {e} <br/> 
     </label> 
     ))}
     </div>
</div>

{
 !input.name || !input.rating || !input.description ||
 !input.image|| !input.released || !input.platform.length || !input.genres.length ? 
      <button className={styles.crear} disabled type="submit">
          CREAR JUEGO
       </button>
  : 
      <button className={styles.crear} type="submit">
          CREAR JUEGO
      </button>
  }
  
    </form>
    </div>
  </div>
    )
  }
  
  
  
  
  