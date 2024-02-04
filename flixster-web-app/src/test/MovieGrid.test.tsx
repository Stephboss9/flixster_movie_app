import { render, screen} from "@testing-library/react"
import MovieGrid from "../components/MovieGrid/MovieGrid";

describe ('Movie Grid Component', () => {
  const movies = [ 
    {
        id:1,
        title:"WONKA",
        poster_path:"./",
        vote_average:7,
    },
    {
        id:2,
        title:"AQUAMAN AND THE LOST KINGDOM",
        poster_path:"./",
        vote_average:7,
        },
    {
        id:3,
        title:"THE BEEKEEPER",
        poster_path:"./",
        vote_average:9,
    },
    {
        id:4,
        title:"MIGRATION",
        poster_path:"./",
        vote_average:8,
    },  
  ]
  
  test('Movie Grid renders movies ', () => {
    render(<MovieGrid movies={movies}/>);
    expect(screen.getAllByTestId('movie-grid').length).toBe(1);
    expect(screen.getAllByTestId('movie').length).toBe(4);
  });


});