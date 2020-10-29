import styled from 'styled-components/macro';

export const Container = styled.main`
    display: flex;
    align-items: center;
    justify-content: center;

    width: 100vw;
    height:  100vh;
`;

export const Content = styled.div`
    width: 100%;
    max-width: 430px;
    height: 600px;

    padding: 50px;
    border: solid 2px #EEE;
    border-radius: 8px;

    @media (max-width: 400px) {
        height: 100%;
        padding: 50px 30px;
        border-radius: 0;
    };
`;

export const Link = styled.div`
    position: absolute;
    top: 40px;
    left: 60px;
    cursor: pointer;

    .MuiSvgIcon-root {
        font-size: 30px !important;
        color: #455A64;
    };
`;
