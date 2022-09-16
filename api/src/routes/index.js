const axios = require('axios')
const { Videogame, Genres} = require('../db.js')

const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


require('dotenv').config();
const {API_KEY} = process.env;
const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

const infoApi = async() => {
  let url = `https://api.rawg.io/api/games?key=${API_KEY}`
  let videojuegos = []
try {
  for(let i=1; i<=5; i++) { 
    const respuesta = await axios.get(url) 
      respuesta.data.results.map(info => { 
    videojuegos.push({ 

      id: info.id,
      name: info.name,
      image: info.background_image,
      released: info.released,
      rating: info.rating,
      description: info.description,
      platform: info.platforms.map(el => el.platform.name),
      genres: info.genres.map(genero => genero.name),
      
      
  })
 });
   
    url = respuesta.data.next
  }
    return videojuegos
} catch(err) {
  console.log(err)
}
};

//trae información de la DB
const getDbGames = async () =>{
  return await Videogame.findAll({
     include :{ 
       model : Genres,
       attributes : ['name'], 
       through:{ 
     attributes :[],
   }
  }
  })
}

const getAllGames= async () =>{
  const apiInfo = await infoApi();
  const dbInfo= await getDbGames();
  const [dbData , apiData] = await Promise.all ([apiInfo , dbInfo])
    
  return [...dbData , ...apiData]
}

router.get('/videogames',async(req,res,next)=>{
  const {name}= req.query;
try {
  let allGames = await getAllGames();
  if (name) {
    let filteredGames = await allGames.filter((e) => {
      return e.name.toLowerCase().includes(name.toLowerCase());
   });
    filteredGames.length
    ? res.status(200).json(filteredGames)
    : res.status(404).send("Video Juego no encontrado");
  } else {
      res.status(200).json(allGames);
  }
  } 
  catch (error) {
    next(error)
    }
})
  

router.get('/videogame/:id', async (req,res,next)=>{
  const {id}= req.params
  let validate = id.includes("-")
  
if(validate){
  try {
   let dbId = await Videogame.findByPk(id, { include: Genres }); 
   res.status(200).json([dbId]);
} catch (error) {
      
  }
}
 else {
  try {
if(id){
 const game = await axios.get(`https://api.rawg.io/api/games/${id}?key=${API_KEY}`)
 const results = {

  id: game.data.id,
  name: game.data.name,
  image: game.data.background_image,
  genres: game.data.genres.map((e) => e.name),
  platform: game.data.platforms.map((e) => e.platform.name),
  description: game.data.description,
  rating: game.data.rating,
  released: game.data.released,

 }  
 return res.status(200).json(results);
    }
  } catch (error) {
   res.status(400).send({msg :'No se encontró el JUEGO solicitado' })
  }
}
})

router.get ('/genres', async(req,res,next)=>{
  try {
  const genresApi = await axios.get(`https://api.rawg.io/api/genres?key=${API_KEY}`) 
  const genresArray = await genresApi.data.results ;

  genresArray.forEach(genres =>{
    Genres.findOrCreate({ where : { name : genres.name} })
  })
  const allGenres = await Genres.findAll();
  res.send(allGenres)
  } catch (error) {
    next(error)
  }
})

router.post('/videogames', async (req, res) => {
  const {name,description,image,rating,platform,genres, released} = req.body;
  const videogameCreated = await Videogame.create({

    name, 
    description,
    image,
    rating,
    platform,
    released,
      
  });
  const genresDb = await Genres.findAll({ where: {name: genres} });
    videogameCreated.addGenres(genresDb);
    res.status(200).send({msg:'Video juego creado con Exito'});
  });


module.exports = router;
