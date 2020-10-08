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
    background-color: #f7f7f7;
    padding: 0 40px;
    border-radius: 10px; 
    margin: 30px 0;

    @media (max-width: 650px) {
        width: 75%;
    }
`;

export const Title = styled.h1`
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 30px;
    font-weight: 600;
    margin: 80px 0px 40px 0px;
    color: #555;


    @media (max-width: 550px) {
        margin-top: 70px;
    }
`

export const FormGroup = styled.form`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-color: ${({ backgroundColor }) => backgroundColor ? backgroundColor : '#f7f7f7'};
    border-bottom:${({borderBottom }) => borderBottom && 'solid 2px #f7f7f7'}
`;

export const Input = styled.input`
    padding: 20px 10px;
    margin: 8px 2px;
    border: none;
    outline: none;
    width: calc(100% - 20px);
    background-color: #ededed;

    @media (max-width: 600px) {
        width: 90%; 
    };
`;

export const Submit = styled.button`
    padding: 20px;
    margin: 30px 0 15px 0;
    border: none;
    outline: none;
    cursor: pointer;
    width: 200px;
    font-weight: bold;
    background-color: #25d366;
    color: #555;
    border-radius: 8px;
`;

export const Text = styled.p`
    color: #000;
    margin: 0;
    margin: 30px 0 70px 0;
    text-align: center;

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

    @media (max-width: 600px) {
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


export const MessageContainer = styled.div` /* Chat container */
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 62px;
    border-top: 1px solid lightgray;

    .MuiSvgIcon-root {
        padding: 10px;
        color: gray;
    }
`;
export const Message = styled.form` /* Chat container */
    display: flex;
    flex: 1;
`;
export const MessageInput = styled.input` /* Chat container */
    flex: 1;
    border-radius: 30px;
    padding: 10px;
    border: none;
    outline: none;
`;
export const MessageButton = styled.button` /* Chat container */
    display: none;
`;


export const SearchContainer = styled.div`
    display: flex;
    align-items: center;
    background-color: #fff;
    width: 100%;
    height: 35px;
    border-radius: 20px;

    .MuiSvgIcon-root {
        color: gray;
        padding: 10px;
    };

    @media (max-width: 500px) {
        .MuiSvgIcon-root {
            display: none !important;
        };
    };
`;

export const Search = styled.div`
    display: flex;
    align-items: center;
    width: 90%;
    margin: 10px auto;
    height: 40px;
    background-color: #fff;
    border-radius: 20px;

    .MuiSvgIcon-root {
        margin: 0 15px 0 10px;
        color: #777;
        font-size: 20px;
    };
`;

export const SearchInput = styled.input`
    border: none;
    outline: none;
    background: none;
    flex: 1;
` ;


export const Label = styled.label` /* Sidebar conatiner  */
    width: calc(100% - 25px);
    margin-left: 25px;
    margin-top: 15px;;
    font-size: 15px;
    color: green;
`
export const DropsideInput = styled.input` /* Sidebar conatiner  */
    border: none;
    outline: none;
    padding: 15px 25px;
    background-color: #ededed;
    font-size: 20px;
    border-bottom: 2px solid #fff;
    width: calc(100% - 50px);
    margin-bottom: 10px;
` 

export const DropsideSubmit = styled(Submit)`
    margin-top: 10px;
`