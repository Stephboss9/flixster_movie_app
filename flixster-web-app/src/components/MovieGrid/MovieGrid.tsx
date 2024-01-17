import {
    MovieGridWrapper
} from './MovieGridStyle'
import Movie from './Movie/Movie'

type MovieGridProps = {
    movies:[];
}

const MovieGrid = ({movies}: MovieGridProps) => {
    return (<>
        {/* <MovieGridWrapper>
            {movies?.map( movie => {
                <Movie movie={movie}/>
            })}
        </MovieGridWrapper>
     */}
    </>);
}

export default MovieGrid;