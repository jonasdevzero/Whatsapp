import styled from 'styled-components/macro';
import { Link as ReactRouterLink } from 'react-router-dom';

export const Container = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex: 1;
    background-color: #fff;
`;

export const Inner = styled.div`
    display: flex;
    flex-direction: column;
    width: 500px;
    max-width: 100%;

    @media (max-width: 500px) {
        width: 100%;
    }
`;

export const Title = styled.h1`
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 30px;
    font-weight: 600;
    margin: 80px 0px 40px 0px;


    @media (max-width: 550px) {
        margin-top: 70px;
    }
`

export const FormGroup = styled.form`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-color: #f6f6f6;
`;

export const Input = styled.input`
    padding: ${({ padding }) => padding ? padding : '20px 0px'};
    margin: ${({ margin }) => margin ? margin : '8px 2px'};
    border: none;
    outline: none;
    width: 90%;
    background-color: ${({ bg }) => bg ? bg : '#ededed'};
`;

export const Submit = styled.button`
    padding: 20px;
    margin: ${({ margin }) => margin ? margin : '15px 0'};
    border: none;
    outline: none;
    cursor: pointer;
    width: ${({ width }) => width ? width : '100%'};
    font-weight: bold;
    background-color: #25d366;
`;

export const Text = styled.p`
    color: #000;
    margin: 0;
    margin: 30px 0 70px 0;

    @media (max-width: 500px) {
        margin-left: 16%;
    }
`

export const Link = styled(ReactRouterLink)`
    text-decoration: none;
    color: lightgray;
    transition: all .5s ease;

    &:hover {
        color: chartreuse;
        font-weight: bold;
    }
`

export const Error = styled.div`
    background-color: red;
    padding: 22px;
    margin-bottom: 20px;
    border-radius: 2px;
    color: #fff;
`

export const Group = styled.div`
    display: flex;
    width: 100%;

    @media (max-width: 550px) {
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }
`

export const Icon = styled.img`
    width: 50px;
    height: 50px;
    margin-left: 15px;
` 