import starIcon from '../../../assets/star_icon.png';
import {
    MovieCardWrapper,
    MoviePoster,
    RatingIcon,
    MovieRating,
    MovieTitle,
} from './MovieStyle';

type MovieCardProps = {
    title: string;
    posterUrl: string;
    rating:number;
};

// movie card component
const Movie = ({title, posterUrl, rating}: MovieCardProps) => {
    const imgBaseUrl:string = import.meta.env.VITE_IMG_BASE_URL;
    return (<>
        <MovieCardWrapper>
            <MoviePoster src={imgBaseUrl + posterUrl}/>
            <MovieRating>
                <RatingIcon src={starIcon}/> 
                {` ${(Math.round(rating))}/10`}
            </MovieRating>
            <MovieTitle>{title}</MovieTitle>
        </MovieCardWrapper>
    </>
    );
}

export default Movie;