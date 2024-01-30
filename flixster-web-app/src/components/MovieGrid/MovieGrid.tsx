import {
    MovieGridWrapper
} from './MovieGridStyle'
import Movie from './Movie/Movie'
import { MovieType } from '../../types/types'

type MovieGridProps = {
    movies: Array<MovieType>;
}

const MovieGrid = ({ movies }: MovieGridProps) => {
    return (<>
        <MovieGridWrapper>
            {movies?.map(movie =>
                <Movie key={movie.id} title={movie.title} posterUrl={movie.poster_path}
                    rating={movie.vote_average} />
            )};
        </MovieGridWrapper>

    </>);
}

export default MovieGrid;

