import styled from 'styled-components/macro';
import { Link as ReactRouterLink } from 'react-router-dom'; 

export const Container = styled.div`
    display: flex;
    flex-direction: column;
    position: relative;

    width: 100vw;
    height: 100vh;
`;

export const Header = styled.header`
    display: flex;
    align-items: center;
    justify-content: space-between;

    height: 80px;
    padding: 0 50px;

    background-color: #4AC959;

    .MuiSvgIcon-root {
        font-size: 50px !important;
        color: #FFF;
    };
`;

export const HeaderWrapper = styled.div`
    display: flex;
    align-items: center;
`;

export const HeaderTitle = styled.h1`
    font-weight: 600;
    letter-spacing: 1px;
    color: #FFF;

    margin: 0 10px;
`;

export const Link = styled(ReactRouterLink)`
    font-size: 18px;
    font-weight: 700;
    color: #FFF;
    transition: color .3s ease;
    text-decoration: none;

    margin: 0 10px;

    &:hover {
        color: #EEE;
    };
`;

export const Content = styled.main`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    width: 100vw;
    height: calc(100vh - 160px);
    margin-bottom: 60px;
`;

export const Title = styled.h1`
    font-size: 38px;
    font-weight: 700;
    color: #455A64;
`;

export const Info = styled.h2`
    font-size: 24px;
    font-weight: 500;
    color: #455A64;
`;

export const SocialContainer = styled.div`
    display: flex;
    flex-direction: column;

    position: absolute;
    bottom: 50px;
    right: 50px;

    a {
        .MuiSvgIcon-root {
            font-size: 35px !important;
            color: #455A64;
            transition: color .3s ease;

            margin-top: 10px;
        };

        .MuiSvgIcon-root:hover {
            color: #000
        };
    };
`;