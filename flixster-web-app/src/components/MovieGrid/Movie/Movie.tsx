import starIcon from '../../../assets/star_icon.png';

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
    showMore: (movieId: number, title: string, overview: string) => void;
};

// movie card component
const Movie = ({ movieId, title, posterUrl, rating, overview, showMore }: MovieCardProps) => {

    const imgBaseUrl: string = import.meta.env.VITE_IMG_BASE_URL;
    return (<>
        <MovieCardWrapper
            onClick={() => {
                showMore(movieId, title, overview);
            }
            }>
            <MoviePoster src={imgBaseUrl + posterUrl} />
            <MovieRating>
                <RatingIcon src={starIcon} />
                {` ${(Math.round(rating))}/10`}
            </MovieRating>
            <MovieTitle>{title}</MovieTitle>
        </MovieCardWrapper>
    </>
    );
}

export default Movie;