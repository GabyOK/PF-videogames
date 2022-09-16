import './App.css';
import {BrowserRouter,Routes,Route,} from "react-router-dom";
import LandingPage from './components/LandingPage/LandingPage';
import Home from './components/Home/Home';
import Details from './components/Details/Details';
import GameCreate from './components/GameCreate/GameCreate';

function App() {
  return (
  <BrowserRouter >
    <Routes>
    <Route exact path ='/'element={<LandingPage/>}/>
    <Route exact path= '/home' element={<Home/>}/>
    <Route exact path= '/videogames' element={<GameCreate/>}/>
    <Route exact path= '/videogame/:id' element={<Details/>}/>
    </Routes>
  </BrowserRouter>
  );
}

export default App;
