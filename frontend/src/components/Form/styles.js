import styled from 'styled-components/macro';
import { Link as ReactRouterLink } from 'react-router-dom';

export const FormContainer = styled.form`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    height: 100%;
`;

export const Title = styled.h1`
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 0;

    font-size: 30px;
    font-weight: 600;
    color: #555;
`;

export const InputWrapper = styled.div`
    display: flex;
    width: 100%;

    input + input {
        margin-left: 10px;
    };

    @media (max-width: 600px) {
        flex-direction: column;

        input + input {
            margin-left: 0;
        };
    }
`;

export const Input = styled.input`
    width: 100%;
    margin-top: 20px;
    padding: 20px 10px;

    background-color: #EEE;

    border: none;
    border-radius: 5px;
    outline: none;

    @media (max-width: 600px) {
        padding: 15px 8px;
    };
`;

export const Submit = styled.button`
    width: 100%;
    margin: 15px 0;
    padding: 20px;

    background-color: #25d366;
    color: #555;
    font-weight: bold;
    
    border: none;
    border-radius: 5px;
    outline: none;
    cursor: pointer;
`;

export const Description = styled.p`
    margin: 0;
    color: #000;
    text-align: center;

    a {
        margin-left: 10px;
    };
`;

export const Link = styled(ReactRouterLink)`
    color: lightgray;
    text-decoration: none;
    transition: all .3s ease;

    &:hover {
        color: #555;
        font-weight: bold;
    };
`;

export const Error = styled.div`
    background-color: red;
    padding: 22px;
    margin-bottom: 20px;
    border-radius: 2px;
    color: #fff;
`;

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
    /* background-color: #f7f7f7; */
    padding: 0 40px;
    border-radius: 10px; 
    margin: 30px 0;

    @media (max-width: 650px) {
        width: 75%;
    }
`;

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