import Navigation from './components/Navigation/Navigation';
import { useState, useEffect } from 'react';
import MovieGrid from './components/MovieGrid/MovieGrid';
import { useMovies } from '../src/hooks/useMovies';
import ApiClient from '../services/api-client';
import { MovieType } from './types';

const App = () => {

  const [movies, setMovies] = useState<Array<MovieType>>([]);
  const [page, setPage] = useState<number>(1);
  const [movieListCategory, setMovieListCategory] = useState<string>('now_playing');
  const [searchQuery, setSearchQuery] = useState<string>("");
  const api: ApiClient = new ApiClient();
  const {
    isLoading,
    isError,
    error,
    hasNextPage,
  } = useMovies({ page, movieListCategory, api, searchQuery, movies, setMovies });





  return (
    <>
      <Navigation setMovieListCategory={setMovieListCategory} setMovies={setMovies} page={page} setPage={setPage} />
      <MovieGrid movies={movies} apiClient={api} isLoading={isLoading} hasNextPage={hasNextPage} setPage={setPage} />
    </>
  );
}

export default App;
