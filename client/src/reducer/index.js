const initailState = {
 videoGames : [] ,
 allVideoGames : [],
 genres : [],
 detail : [],

}

export default function rootReducer(state = initailState , action){
 switch(action.type){
  case 'GET_ALL_GAMES':
  return {
    ...state,  
    videoGames : action.payload,
    allVideoGames : action.payload

}
 case 'ORDER_BY_GAMES':
    let orderGames = state.videoGames
    if(action.payload === 'Asc'){
   orderGames = state.videoGames.sort((a,b)=>{
    if(a.name.toLowerCase() < b.name.toLowerCase())return -1;
    if(a.name.toLowerCase() > b.name.toLowerCase())return 1;
    return 0
   })   
}else if (action.payload === 'Desc'){
  orderGames = state.videoGames.sort((a,b)=>{
    if(a.name.toLowerCase() < b.name.toLowerCase()) return 1;
    if(a.name.toLowerCase() > b.name.toLowerCase())return -1;
    return 0
  })
}
return {
  ...state,
  videoGames : orderGames
}
case 'ORDER_BY_RATING':
  let orderRating = state.videoGames
  if(action.payload === 'Min'){
 orderRating = state.videoGames.sort((a,b)=>{
  if(a.rating < b.rating)return -1;
  if(a.rating > b.rating)return 1;
  return 0
 })   
}else if (action.payload === 'Max'){
orderRating = state.videoGames.sort((a,b)=>{
  if(a.rating < b.rating) return 1;
  if(a.rating > b.rating)return -1;
  return 0
})
}
return {
  ...state,
  videoGames : orderRating
  } 
case 'GET_NAME_GAMES':
return {
  ...state,
  videoGames : action.payload
}
case 'GET_ALL_GENRES':
  return{
    ...state,
    genres : action.payload
  }
case 'FILTER_BY_GENRES':
const allVideoGames = state.allVideoGames
const filterGame= allVideoGames.filter ((e)=>
e.genres.includes(action.payload));
return{
  ...state,
  videoGames: action.payload === 'Todos'? state.allVideoGames : filterGame
}

case 'FILTER_CREATED':
  const allVideo= state.allVideoGames
  const filtroDb= allVideo.filter(e=> typeof e.id=== 'string')
  const filtroApi= allVideo.filter(e=> typeof e.id==='number')
  return{
    ...state,
    videoGames: action.payload==='all'? state.allVideoGames : action.payload === 'db' ?filtroDb : filtroApi
  }
  
 case 'GET_DETAILS':
  return {
    ...state,
    detail : action.payload
  }
  case'RESET_DETAIL':
  return{
    ...state,
    detail: []
  }
  case 'POST_GAME':
  return {
    ...state,
  }

default: 
  return state
    }
  }







  
  
