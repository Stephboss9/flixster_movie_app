// import { useState } from 'react';
// import reactLogo from './assets/react.svg';
// import viteLogo from '/vite.svg';
import Navigation from './components/Navigation/Navigation';
import './App.css';
import { useState} from 'react';
import MovieGrid from './components/MovieGrid/MovieGrid';


const App = () => {

  const [movies, setMovies] = useState<[]>([]);
 // const [searchedMovies, setSearchedMovies] = useState<[]>([]);
  const [page, setPage] = useState(1);
  return (
    <>
    <Navigation setMovies={setMovies} page={page} setPage={setPage}/>
    <MovieGrid movies={movies}/>
    </>
  );
}

export default App;
