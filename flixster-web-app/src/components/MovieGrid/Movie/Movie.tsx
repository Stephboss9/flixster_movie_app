import starIcon from '../../../assets/star_icon.png';
import { MovieModalInfoType } from '../../../types';

import {
    MovieCardWrapper,
    MoviePoster,
    RatingIcon,
    MovieRating,
    MovieTitle,
} from './MovieStyle';

type MovieCardProps = {
    movieId: number;
    title: string;
    posterUrl: string;
    rating: number;
    overview: string;
    releaseDate: string;
    showMore: (movieModalInfo: MovieModalInfoType) => void;
};

// movie card component
const Movie = ({ movieId, title, posterUrl, rating, overview, releaseDate, showMore }: MovieCardProps) => {
    const movieModalInfo: MovieModalInfoType = { movieId: movieId, title: title, overview: overview, release_date: releaseDate };
    const imgBaseUrl: string = import.meta.env.VITE_IMG_BASE_URL;
    const movieRating: string = `${(Math.round(rating))}/10`;

    return (<>
        <MovieCardWrapper
            onClick={() => {
                showMore(movieModalInfo);
            }
            }>
            <MoviePoster src={imgBaseUrl + posterUrl} />
            <MovieRating>
                <RatingIcon src={starIcon} />
                {movieRating}
            </MovieRating>
            <MovieTitle>{title}</MovieTitle>
        </MovieCardWrapper>
    </>
    );
}

export default Movie;