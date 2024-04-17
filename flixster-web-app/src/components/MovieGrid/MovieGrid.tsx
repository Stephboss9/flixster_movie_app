import {
    MovieGridWrapper,
    Modal,
    ModalContent,
    Trailer,
    MovieInfo,
    MovieTitle,
    MovieDescription,
    MovieReleaseDate,
    BackToTopLink,
    BackToTopLinkWrapper,
    LoadingHeader,
    ErrorHeader,
} from './MovieGridStyle'
import Movie from './Movie/Movie'
import { MovieModalInfoType, MovieType, MovieVideoType } from '../../types';
import React, { useState, useRef, useCallback, useMemo } from 'react';
import ApiClient from '../../../services/api-client';


type MovieGridProps = {
    movies: Array<MovieType>;
    apiClient: ApiClient;
    isLoading: boolean;
    hasNextPage: boolean;
    isError: boolean;
    error: { message: string };
    setPage: React.Dispatch<React.SetStateAction<number>>;
}

const MovieGrid = ({ movies, apiClient, isLoading, hasNextPage, isError, error, setPage }: MovieGridProps) => {
    const [open, setOpen] = useState(false);
    const [movieModalInfo, setMovieModalInfo] = useState({ overview: '', videoLink: '', title: '', releaseDate: '' });

    const handleOpen = async (movieModalInfo: MovieModalInfoType) => {
        // fetch available videos from api
        const movieVideos: Array<MovieVideoType> = (await apiClient.getMovieVideo(movieModalInfo.movieId)).data;

        // get a trailer from list of fetched videos else the first one in the list
        const movieTrailerLink: string = (movieVideos.filter(
            (vid: MovieVideoType) => vid.type === 'Trailer')[0].key || movieVideos[0].key);

        setMovieModalInfo({
            overview: movieModalInfo.overview, title: movieModalInfo.title,
            videoLink: movieTrailerLink, releaseDate: movieModalInfo.release_date
        });

        // open the modal once weve acquired movie information
        setOpen(true);
    }
    const handleClose = () => setOpen(false);

    // handles infinite scroll
    const intObserver = useRef<IntersectionObserver | null>(null);
    const lastPostRef = useCallback((movie: HTMLDivElement) => {
        if (isLoading) return;

        if (intObserver.current) intObserver.current.disconnect();

        intObserver.current = new IntersectionObserver(moviess => {
            if (moviess[0].isIntersecting && hasNextPage) {
                setPage(prev => prev + 1);
            }
        })
        if (movie) intObserver.current?.observe(movie);

    }, [isLoading, hasNextPage]);


    return (<>
        <MovieGridWrapper id="movie-grid" data-testid="movie-grid">
            {movies?.map((movie, i) => {
                if (movies.length === i + 1) {
                    return (<Movie key={movie.id} movieId={movie.id} title={movie.title} showMore={handleOpen}
                        overview={movie.overview} releaseDate={movie.release_date} posterUrl={movie.poster_path} rating={movie.vote_average}
                        data-testid="movie" ref={lastPostRef}
                    />)
                }
                return (<Movie key={movie.id} movieId={movie.id} title={movie.title} showMore={handleOpen}
                    overview={movie.overview} releaseDate={movie.release_date} posterUrl={movie.poster_path} rating={movie.vote_average}
                    data-testid="movie"
                />)
            }
            )}
            {isLoading && <LoadingHeader>Loading more movies!</LoadingHeader>}
            {isError && <ErrorHeader>{error.message}</ErrorHeader>}
            <BackToTopLinkWrapper>
                <BackToTopLink href='#movie-grid'>Back to top</BackToTopLink>
            </BackToTopLinkWrapper>
            <Modal
                open={open}
                onClick={handleClose}
                aria-modal="true"
                aria-labelledby="Movie Pop up"
                aria-describedby="More info about movie including a trailer, movie description, and more">
                <ModalContent>
                    <Trailer src={movieModalInfo.videoLink}></Trailer>
                    <MovieInfo>
                        <MovieTitle>{movieModalInfo.title}</MovieTitle>
                        <MovieDescription>{movieModalInfo.overview}</MovieDescription>
                        <MovieReleaseDate>{`released: ${movieModalInfo.releaseDate.slice(0, 4)}`}</MovieReleaseDate>
                    </MovieInfo>
                </ModalContent>
            </Modal>
        </MovieGridWrapper>
    </>);
}


export default MovieGrid;


