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
    const [movieInfo, setMovieInfo] = useState({ overview: '', videoLink: '', title: '' });

    const handleOpen = async (movieId: number, title: string, overview: string) => {
        // gather info for movie that was clicked on
        const movieVideos = (await apiClient.getMovieVideo(movieId)).data;

        const movieTrailerLink: string = movieVideos.filter(
            (vid: { key: string, type: string }) => vid.type === 'Trailer')[0].key || movieVideos[0].key;
        setMovieInfo({
            overview: overview, title: title,
            videoLink: movieTrailerLink
        });

        setOpen(true);
    }
    const handleClose = () => setOpen(false);

    return (<>
        <MovieGridWrapper data-testid="movie-grid">
            {movies?.map(movie =>
                <Movie key={movie.id} movieId={movie.id} title={movie.title} showMore={handleOpen}
                    overview={movie.overview} releaseDate={movie.release_date} posterUrl={movie.poster_path} rating={movie.vote_average}
                    data-testid="movie"

                />
            )};
            <Modal
                open={open}
                onClick={handleClose}
                aria-modal="true"
                aria-labelledby="Movie Pop up"
                aria-describedby="More info about movie including a trailer, movie description, and more">
                <ModalContent>
                    <Trailer src={movieInfo.videoLink}></Trailer>
                    <MovieInfo>
                        <MovieTitle>{movieInfo.title}</MovieTitle>
                        <MovieDescription>{movieInfo.overview}</MovieDescription>
                    </MovieInfo>
                </ModalContent>
            </Modal>
        </MovieGridWrapper>
    </>);
}


export default MovieGrid;


