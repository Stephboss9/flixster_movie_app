import React, { MouseEvent, ChangeEvent, useCallback} from 'react'
import { useState} from 'react'
import {
    NavHeader,
    Title,
    NavWrapper,
    NavLinks,
    Link,
    SearchButton,
    SearchBox,
    SearchInput,
    SearchIcon,
} from './NavStyle'
import searchIcon from '../../assets/search-icon.svg';
import clearIcon from '../../assets/clear-icon.svg';
import ApiClient from '../../../services/api-client';
import { debounce } from 'lodash';


type NavigationProps = {
    setMovies: React.Dispatch<React.SetStateAction<[]>>;
    setPage: React.Dispatch<React.SetStateAction<number>>;
    page: number;
}

const Navigation = ({ setMovies, setPage, page }: NavigationProps) => {
    const [isTyping, setIsTyping] = useState(false);
    const [userInput, setUserInput] = useState("");
    const apiClient = new ApiClient();


    const handleOnInputChange = useCallback(debounce(async (event: ChangeEvent<HTMLInputElement>) => {
        const input = event.target.value;
        const movies = (await apiClient.searchMovies(1, `movie`, input)).movies;
        setMovies(movies);
    }, 600), []);

    const handleClearClick = (event: MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        setUserInput("");
        setIsTyping(false);
    }

    const handleOnInputBlur = (event: ChangeEvent<HTMLInputElement>) => {
        setIsTyping(event.target.value !== "");
    }

    const handleOnNavLinkClick = async (movieListType: string) => {
        setPage(1);
        let movies;
        switch (movieListType) {
            case 'home':
                movies = (await apiClient.getMovies(page, 'now_playing')).movies;
                break;
            case 'popular':
                movies = (await apiClient.getMovies(page, 'popular')).movies;
                break;
            case 'top rated':
                movies = (await apiClient.getMovies(page, 'top_rated')).movies;
                break;
            case 'upcoming':
                movies = (await apiClient.getMovies(page, 'upcoming')).movies;
                break;
        }
        setMovies(movies);
    }


    return (<>
        <NavWrapper>
            <NavHeader>
                <Title data-testid='title'>Flixster</Title>
                <NavLinks>
                    <Link
                        data-testid="nav-link"
                        onClick={() => handleOnNavLinkClick('home')}>Home</Link>
                    <Link
                        data-testid="nav-link"
                        onClick={() => handleOnNavLinkClick('popular')}>Popular</Link>
                    <Link
                        data-testid="nav-link"
                        onClick={() => handleOnNavLinkClick('top rated')}>Top Rated</Link>
                    <Link
                        data-testid="nav-link"
                        onClick={() => handleOnNavLinkClick('upcoming')}>Upcoming</Link>
                </NavLinks>
                <SearchBox>
                    <SearchButton
                        data-testid="search-button"
                        onClick={handleClearClick}>
                        <SearchIcon
                            data-testid="search-icon"
                            src={isTyping ? clearIcon : searchIcon}
                            alt={isTyping ? 'clear button icon' : 'search button icon'} />
                    </SearchButton>
                    <SearchInput
                        data-testid="search-input"
                        onChange={(e) => {
                            handleOnInputChange(e);
                            setUserInput(e.target.value);
                            setIsTyping(e.target.value !== "");
                        }}
                        value = {userInput}
                        onBlur={handleOnInputBlur}
                        type="text" />
                </SearchBox>
            </NavHeader>
        </NavWrapper>
    </>)
}


export default Navigation;