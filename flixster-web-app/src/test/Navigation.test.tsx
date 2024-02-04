import React from "react";
import { render, screen} from "@testing-library/react"
import Navigation from "../components/Navigation/Navigation";

describe ('Navigation Component', () => {

  afterEach(() => {
    vi.restoreAllMocks()
  })

  test('Navigation component renders', () => {
     // mocks states in navigation component
     const setStateMock = vi.fn();
     const setMoviesMock = vi.fn();
     const setPageMock = vi.fn();

     // eslint-disable-next-line @typescript-eslint/no-explicit-any
     const useStateMock: any = (useState: any) => [useState, setStateMock];
     vi.spyOn(React, 'useState').mockImplementationOnce(useStateMock);
     
    render(<Navigation setMovies={setMoviesMock} page={1} setPage={setPageMock}/>);
    
    // checks existence of title
    expect(screen.getByTestId('title')).toBeInTheDocument();
    expect(screen.getByTestId('title')).toHaveTextContent("Flixster");

    // checks existence of Nav Links
    expect(screen.getAllByTestId('nav-link').length).toBe(4);

    // checks existence of search button
    expect(screen.getByTestId('search-button')).toBeInTheDocument();

    // checks existence of search icon
    expect(screen.getByTestId('search-icon')).toBeInTheDocument();

    // checks existence of search input
    expect(screen.getByTestId('search-input')).toBeInTheDocument();
    });
});
