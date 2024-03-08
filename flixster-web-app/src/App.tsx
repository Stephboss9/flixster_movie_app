import Navigation from './components/Navigation/Navigation';
import { useState, useEffect } from 'react';
import MovieGrid from './components/MovieGrid/MovieGrid';
import ApiClient from '../services/api-client';

const App = () => {

  const [movies, setMovies] = useState<[]>([]);
  const [page, setPage] = useState(1);
  const apiClient = new ApiClient();



  useEffect(() => {
    const getNowPlaying = async () => {
      const { data } = await apiClient.getMovies(page, 'now_playing');
      setMovies(data);
    }
    getNowPlaying();
  }, [])

  return (
    <>
      <Navigation setMovies={setMovies} page={page} setPage={setPage} />
      <MovieGrid movies={movies} apiClient={apiClient} />
    </>
  );
}

export default App;
