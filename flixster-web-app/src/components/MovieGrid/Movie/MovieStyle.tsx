import { styled, keyframes } from "styled-components";

export const MovieCardWrapper = styled.div`
    flex: 0 1 4%;
    text-align:center;
    display:flex;
    flex-direction:column;
    align-items:center;
    margin-bottom: 40px;
    color: rgb(252, 254, 255);
    &:hover {
        z-index:1;
    }
    position: relative;
`;
export const MovieTitle = styled.p`
    color:inherit;
    width:100%;
    `;

const revealAnimation = keyframes`
    0% {
        transform: translateY(150px);
        opacity: 0;
    }

    100% {
        transform: translateY(0px);
        opacity:1;
    }
`;

export const MoviePoster = styled.img`
    border: 1px solid #333;
    transition: transform 400ms ease-in-out;
    box-shadow: var(--movie-card-bs);
    margin-bottom: 18px;
    cursor:pointer;
    animation: ${revealAnimation} 1.2s ease-in-out;
    &:hover {
        border: 1px solid white;
        transform: scale(1.07);
    }
`;

export const RatingIcon = styled.img`
    width:20px;
    height:20px;
`;
export const MovieRating = styled.p``;

