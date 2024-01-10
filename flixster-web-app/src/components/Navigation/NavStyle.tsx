import styled from "styled-components";
import logo from '../../assets/logo.png';

export const FlixsterLogo = styled.img`
    width:150px;
    height:70px;
`;


FlixsterLogo.defaultProps = {
    src: logo,
}

export const Title = styled.h1`
    color:white;
`
export const NavHead = styled.div`
    display:flex;
    justify-content:center;
`

export const NavWrapper = styled.div`
    width:100%;
    height:250px;
`;


