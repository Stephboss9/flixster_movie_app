import {
    MovieGridWrapper,
    Modal,
    ModalContent,
    Trailer,
    MovieInfo,
    MovieTitle,
    MovieDescription,
} from './MovieGridStyle'
import Movie from './Movie/Movie'
import { MovieType } from '../../types/types'
import { useState } from 'react';
import ApiClient from '../../../services/api-client';


type MovieGridProps = {
    movies: Array<MovieType>;
    apiClient: ApiClient;
}

const MovieGrid = ({ movies, apiClient }: MovieGridProps) => {
    const [open, setOpen] = useState(false);
    const [movieInfo, setMovieInfo] = useState({ overview: '', releaseDate: '', videoLink: '', rating: 0, title: '', time: 0 });

    const handleOpen = async (movieId: number) => {
        // gather info for movie that was clicked on
        const movieInfo = (await apiClient.getMovieInfo(movieId)).data;
        const movieVid = (await apiClient.getMovieVideo(movieId)).data;
        const movieVidLink: string = movieVid[0].key;
        setMovieInfo({
            overview: movieInfo.overview, releaseDate: movieInfo.release_date,
            videoLink: movieVidLink, rating: movieInfo.vote_average, time: movieInfo.runtime, title: movieInfo.title,
        });

        setOpen(true);
    }
    const handleClose = () => setOpen(false);

    return (<>
        <MovieGridWrapper data-testid="movie-grid">
            {movies?.map(movie =>
                <Movie key={movie.id} movieId={movie.id} title={movie.title} showMore={handleOpen}
                    posterUrl={movie.poster_path} rating={movie.vote_average}
                    data-testid="movie"

                />
            )};
            <Modal
                open={open}
                onClick={handleClose}
                aria-labelledby="unstyled-mod"
                aria-describedby="unstyled-modal-description">
                <ModalContent>
                    <Trailer src={movieInfo.videoLink}></Trailer>
                    <MovieTitle>{movieInfo.title}</MovieTitle>
                    <MovieInfo>{movieInfo.time + " min | " + Math.round(movieInfo.rating) + "/10 | released: " + movieInfo.releaseDate}</MovieInfo>
                    <MovieDescription>{movieInfo.overview}</MovieDescription>
                </ModalContent>
            </Modal>
        </MovieGridWrapper>
    </>);
}


export default MovieGrid;


