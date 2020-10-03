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
    width: 350px;
    max-width: 100%;
`;

export const Title = styled.h1`
    font-size: 30px;
    font-weight: 600;
    text-align: center;
    margin: 80px 0px 40px 0px;


    @media (max-width: 550px) {
        margin-top: 70px;
    }
`

export const FormGroup = styled.form`
    display: flex;
    flex-direction: column;
`;

export const Input = styled.input`
    padding: 20px 0px;
    margin: 10px 0px;
    border: none;
    outline: none;
    width: 100%;
    background-color: #ededed;
`;

export const Submit = styled.button`
    padding: 20px;
    margin-top: 15px;
    border: none;
    outline: none;
    cursor: pointer;
    width: 100%;
    font-weight: bold;
    background-color: #25d366;
`;

export const Text = styled.p`
    color: #000;
    margin: 0;
    margin-top: 30px;
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