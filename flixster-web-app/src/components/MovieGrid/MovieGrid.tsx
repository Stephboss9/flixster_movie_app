import {
    MovieGridWrapper
} from './MovieGridStyle'
import Movie from './Movie/Movie'

type MovieGridProps = {
    movies:Array<{id:number, title:string, vote_average:number, poster_path:string}>;
}

const MovieGrid = ({movies}: MovieGridProps) => {
    return (<>
        <MovieGridWrapper>
            {movies?.map( movie => 
                <Movie key={movie.id} title={movie.title} posterUrl={movie.poster_path}
                rating={movie.vote_average}/>
            )};
        </MovieGridWrapper>
    
    </>);
}

export default MovieGrid;

