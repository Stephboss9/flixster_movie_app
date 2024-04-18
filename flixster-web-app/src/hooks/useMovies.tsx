import { useState, useEffect } from 'react';
import ApiClient from '../../services/api-client';
import { MovieType } from '../types';
import { debounce } from 'lodash';
import e from 'express';

type useMoviesHookType = {
    page: number;
    movieListCategory: string;
    api: ApiClient;
    searchQuery: string;
    setMovies: React.Dispatch<React.SetStateAction<Array<MovieType>>>;
}

export const useMovies = ({ page, movieListCategory, api, searchQuery = '', setMovies }: useMoviesHookType) => {
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);
    const [error, setError] = useState({ message: "" });
    const [hasNextPage, setHasNextPage] = useState(false);
    let newMovies: Array<MovieType>;

    useEffect(() => {
        setIsLoading(true);
        setError({ message: "" });
        setIsError(false);

        if (searchQuery) {
            api.searchMovies(page, 'movie', searchQuery).then(result => {
                newMovies = result.data;
                setMovies(prev => [...prev, ...newMovies]);
                setHasNextPage(Boolean(newMovies.length)); // sets flag based on whether there are more results
                setIsLoading(false);
                setIsError(false);
            }).catch(e => {
                setIsLoading(false);
                setIsError(true);
                setError({ message: e.message });

            });
        } else {
            api.getMovies(page, movieListCategory).then(result => {
                newMovies = result.data;
                setMovies(prevMovies => {
                    // Filter out duplicate movies based on some unique identifier (e.g., ID)
                    const uniqueNewMovies = newMovies.filter(newMovie => !prevMovies.some(prevMovie => prevMovie.id === newMovie.id));
                    return [...prevMovies, ...uniqueNewMovies];
                });
                setHasNextPage(Boolean(newMovies.length)); // sets flag based on whether there are more results
                setIsLoading(false);
                setIsError(false);
            }).catch(e => {
                setIsLoading(false);
                setIsError(true);
                setError({ message: e.message });
            })
        }


        return;
    }, [page, movieListCategory])

    return { isLoading, isError, error, hasNextPage };
}

export default useMovies;