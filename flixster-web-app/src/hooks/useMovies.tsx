import { useState, useEffect } from 'react';
import ApiClient from '../../services/api-client';
import { MovieType } from '../types';
import { debounce } from 'lodash';

type useMoviesHookType = {
    page: number;
    movieListCategory: string;
    api: ApiClient;
    searchQuery: string;
    setMovies: React.Dispatch<React.SetStateAction<Array<MovieType>>>;
    movies: Array<MovieType>
}

export const useMovies = ({ page, movieListCategory, api, searchQuery = '', movies, setMovies }: useMoviesHookType) => {
    debugger;
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);
    const [error, setError] = useState({});
    const [hasNextPage, setHasNextPage] = useState(false);
    let newMovies: Array<MovieType>;

    useEffect(() => {
        setIsLoading(true);
        setError({});
        setIsError(false);

        api.getMovies(page, movieListCategory).then(result => {
            newMovies = result.data;
            setMovies(prev => [...prev, ...newMovies]);
            console.log(page);
            setHasNextPage(Boolean(newMovies.length)); // sets flag based on whether there are more results
            setIsLoading(false);
            setIsError(false);
        }).catch(e => {
            setIsLoading(false);
            setIsError(true);
            setError({ message: e.message });
        })


        return;
    }, [page])

    return { isLoading, isError, error, hasNextPage };
}

export default useMovies;