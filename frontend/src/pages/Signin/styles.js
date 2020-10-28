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
    max-width: 400px;
    height: 500px;

    padding: 80px 50px;
    background-color: #fff;

    @media (max-width: 400px) {
        height: 100%;
        padding: 50px 10px;
    };
`;