import axios from "axios";

export default function getAllVideoGames() {
  return async function (dispatch) {
    let json = await axios.get("http://localhost:3001/videogames");
    console.log(json);
    return dispatch({
      type: "GET_ALL_GAMES",
      payload: json.data,
    });
  };
}

export function orderByGames(payload) {
  return {
    type: "ORDER_BY_GAMES",
    payload,
  };
}

export function orderByRating(payload) {
  return {
    type: "ORDER_BY_RATING",
    payload,
  };
}

export function getNameGames(name) {
  return async function (dispatch) {
    try {
      let json = await axios.get(
        "http://localhost:3001/videogames?name=" + name
      );
      return dispatch({
        type: "GET_NAME_GAMES",
        payload: json.data,
      });
    } catch (error) {
      alert("No existe el VideoGames solicitado");
    }
  };
}

export function filterCreated(payload) {
  return {
    type: "FILTER_CREATED",
    payload,
  };
}

export function getAllGenres() {
  return async function (dispatch) {
    let result = await axios.get("http://localhost:3001/genres");
    //console.log(result)
    return dispatch({
      type: "GET_ALL_GENRES",
      payload: result.data,
    });
  };
}

export function getDetails(id) {
  return async function (dispatch) {
    try {
      let gamesId = await axios.get(`http://localhost:3001/videogame/${id}`);
      return dispatch({
        type: "GET_DETAILS",
        payload: gamesId.data,
      });
    } catch (error) {
      alert("No existe el juego solicitado");
    }
  };
}
export function resetDetail() {
  return {
    type: "RESET_DETAIL",
  };
}
export function filterByGenres(payload) {
  return {
    type: "FILTER_BY_GENRES",
    payload,
  };
}
export function postVideoGame(payload) {
  return async function (dispatch) {
    let json = await axios.post("http://localhost:3001/videogames", payload);
    return dispatch({
      type: "POST_GAME",
      payload: json.data,
    });
  };
}
