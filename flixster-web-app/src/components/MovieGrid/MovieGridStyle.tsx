import styled, { keyframes } from "styled-components";
import { Modal as BaseModal } from '@mui/base/Modal';

export const MovieGridWrapper = styled.div`
    display:flex;
    justify-content:space-evenly;
    align-items:center;
    flex-wrap:wrap;
    width:100%;
    position:relative;
    top:80px;
    padding: 30px 0px;
    font-family:Staatliches;
    font-size: x-large;
`;

export const Modal = styled(BaseModal)`
  position: fixed;
  z-index: 1300;
  inset: 0;
  display: flex;
  flex-direction:column;
  background:rgb(0, 0, 0, .5);
  align-items: center;
  justify-content: center;
`

const animateTop = keyframes`
    0% {
        top:-200px;
        opacity:.5;
    }
    100% {
        top:0; 
        opacity:1;
    }
`;

export const ModalContent = styled.div`
    display: flex;
    position:relative;
    flex-direction: column;

    align-items: left;
    font-family: 'Kanit', sans-serif;
    height:600px;
    width:50%;
    background: var(--background-color);
    color: rgb(255, 255, 255);
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
    animation:${animateTop} 1s ease;

`

export const TrailerWrapper = styled.div`
  
`
export const Trailer = styled.iframe.attrs(props => ({
    src: `https://www.youtube.com/embed/${props.src}`,
    title: 'Youtube Video Player',
    frameBorder: 0,
    allow: 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture',
    allowFullScreen: true,
}))`
width:100%;
height:390px;
`

export const MovieInfo = styled.div`
    display:flex;
    flex-direction:column;
    margin-left: 10px;
    margin-right: 10px;
    `
export const MovieTitle = styled.h1`
`;
export const MovieDescription = styled.p`
    width:100%;
    border-bottom: 1px solid white;
    padding-bottom: 15px;
    `;

export const MovieReleaseDate = styled.p`
  margin-top: 15px;
`

export const BackToTopLinkWrapper = styled.p`
    align-self: flex-end;
    position: absolute;
    padding: 5px 5px;
    border-radius:8px;

`;

export const BackToTopLink = styled.a`
    color: rgb(248, 71, 95);
    text-decoration:none;
`;