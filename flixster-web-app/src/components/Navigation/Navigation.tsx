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

    const handleOnHomeClick = async () => {
        setPage(1);
        const { movies } = await apiClient.getNowPlaying(page);
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
                        onClick={handleOnHomeClick}
                    >Home</Link>
                    <Link data-testid="nav-link">Popular</Link>
                    <Link data-testid="nav-link">Top Rated</Link>
                    <Link data-testid="nav-link">Trending</Link>
                    <Link data-testid="nav-link">Upcoming</Link>
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