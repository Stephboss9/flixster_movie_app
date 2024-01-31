import React, { MouseEvent, ChangeEvent } from 'react'
import { useState, useEffect } from 'react'
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


type NavigationProps = {
    setMovies: React.Dispatch<React.SetStateAction<[]>>;
    setPage: React.Dispatch<React.SetStateAction<number>>;
    page: number;
}

const Navigation = ({ setMovies, setPage, page }: NavigationProps) => {
    const [isTyping, setIsTyping] = useState(false);
    const [userInput, setUserInput] = useState("");
    const apiClient = new ApiClient();

    const handleOnInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        const input = event.target.value;
        setUserInput(input);
        setIsTyping(userInput.trim() !== "");
    };

    const handleClearClick = (event: MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        setUserInput("");
        setIsTyping(!isTyping);
    }

    const handleOnInputBlur = () => {
        setIsTyping(userInput.trim() !== "");
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
            case 'top-rated':
                movies = (await apiClient.getMovies(page, 'top_rated')).movies;
                break;
            case 'upcoming':
                movies = (await apiClient.getMovies(page, 'upcoming')).movies;
                break;
        }
        setMovies(movies);
    }


    useEffect(() => {
    }, [isTyping])
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
                        onClick={() => handleOnNavLinkClick('top_rated')}>Top Rated</Link>
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
                        onChange={handleOnInputChange}
                        onBlur={handleOnInputBlur}
                        value={userInput}
                        type="text" />
                </SearchBox>
            </NavHeader>
        </NavWrapper>
    </>)
}


export default Navigation;