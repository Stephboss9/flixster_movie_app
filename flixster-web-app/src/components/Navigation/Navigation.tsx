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
  setMovies:React.Dispatch<React.SetStateAction<[]>>;
  setPage:React.Dispatch<React.SetStateAction<number>>;
  page:number;
}

const Navigation = ({setMovies, setPage, page}:NavigationProps)=> {
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
      const {movies} = await apiClient.getNowPlaying(page);
      console.log(movies)
      // setMovies(movies)
    }
    
    useEffect(() => {
    }, [isTyping])
    return (<>
        <NavWrapper>
            <NavHeader>
                <Title>Flixster</Title>
                <NavLinks>
                    <Link
                    onClick={handleOnHomeClick}>Home</Link>
                    <Link>Popular</Link>
                    <Link>Top Rated</Link>
                    <Link>Trending</Link>
                    <Link>Upcoming</Link>
                </NavLinks>
                <SearchBox>
                    <SearchButton
                        onClick={handleClearClick}>
                        <SearchIcon
                            src={isTyping ? clearIcon : searchIcon}
                            alt={isTyping ? 'clear button icon' : 'search button icon'} />
                    </SearchButton>
                    <SearchInput
                        onChange={handleOnInputChange}
                        onBlur={handleOnInputBlur}
                        value={userInput}
                        type="text" autoFocus />
                </SearchBox>
            </NavHeader>
        </NavWrapper>
    </>)
}


export default Navigation;