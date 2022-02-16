import MyFooter from "./components/MyFooter";
import MyNavbar from "./components/MyNavbar";
import NetflixBody from "./components/NetflixBody";
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import MovieDetails from "./components/MovieDetails";
import { useState } from "react";


function App( prop) {

  const [search, setSearch] = useState("Star Wars")

  return (
    <BrowserRouter>
  <MyNavbar setSearch = {setSearch} textColor='white' textMargin='10px'/>
  <Routes>
  <Route path='/' element={<NetflixBody search={search}/>} />
  <Route path='/series' element={<NetflixBody search={search}/>} />
  <Route path='/movie' element={<NetflixBody search={search}/>} />
  <Route path='/details/:movieId' element={<MovieDetails />} />
  </Routes>
  <MyFooter />
  </BrowserRouter>
  );
}

export default App;
