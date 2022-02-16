import MyFooter from "./components/MyFooter";
import MyNavbar from "./components/MyNavbar";
import NetflixBody from "./components/NetflixBody";
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom'


function App( prop) {
  return (
    <BrowserRouter>
  <MyNavbar textColor='white' textMargin='10px'/>
  <Routes>
  <Route path='/' element={<NetflixBody />} />
  <Route path='/tv-shows' element={<NetflixBody />} />
  <Route path='/movie-details/:movieId' element={<MovieDetails />} />
  </Routes>
  <MyFooter />
  </BrowserRouter>
  );
}

export default App;
