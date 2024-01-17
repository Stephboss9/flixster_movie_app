import styled from "styled-components";

export const MovieCard = styled.div`
    flex: 0 1 25%;
    text-align:center;
    display:flex;
    flex-direction:column;
    align-items:center;
    margin-bottom: 40px;
    :hover {
        z-index:1;
    }
`;
export const MoviePoster = styled.img`
    border: 1px solid #333;
    transition: transform 400ms ease-in-out;
    box-shadow: var(--movie-card-bs);
    margin-bottom: 10px;
    :hover {
        border: 1px solid white;
        transform: scale(1.07);
    }
`;

export const RatingIcon = styled.img``;
export const MovieRating = styled.span``;
