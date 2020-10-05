import styled from 'styled-components/macro';
import { Avatar } from '@material-ui/core';

export const Container = styled.div`
    position: ${({ position }) => position ? position : 'absolute'};
    left: -30%;
    width: 30%;
    z-index: 100;
    height: 100%;
    background-color: #ededed;

    transition: transform .5s ease;
    ${({ profile, newRoom }) => profile || newRoom ? 'transform: translateX(100%)' : null}
    
`

export const Form = styled.form`
    display: flex;
    flex-direction: column;
    flex: 1;
    border-bottom: ${({ bb }) => bb ? 'solid 1px #fff': 'none'}; 
`

export const Label = styled.label`
    margin-top: 15px;
    margin-left: 25px;
    font-size: 15px;
    color: green;
`

export const Input = styled.input`
    border: none;
    outline: none;
    padding: 15px 25px;
    background-color: #ededed;
    font-size: 20px;
    border-bottom: 2px solid #fff;
` 

export const Submit = styled.button`
    border: none;
    outline: none;
    background-color: #25d366;
    border-radius: 5px;
    width: 125px;
    height: 48px;
    margin: 15px auto;
    cursor: pointer;
    font-weight: bold;
    color: #555;
`

export const TitleContainer = styled.div`
    height: 80px;
    display: flex;
    align-items: flex-end;
    padding: 28px;
    background-color: #f9f9f9;
`

export const Title = styled.h1`
    font-size: 24px;
    font-weight: 700;
    display: flex;
    align-items: center;
    color: #777;

    .MuiSvgIcon-root {
        margin-right: 35px;
        cursor: pointer;
    }
`

export const TitleContainer2 = styled.div`
    padding: 21.5px;
    background-color: #fff;
`

export const Title2 = styled.h1`
    font-weight: 500;
    font-size: 20px;
    display: flex;
    align-items: center;
    color: #777;

    .MuiSvgIcon-root {
        margin-right: 35px;
        cursor: pointer;
    }
`

export const PictureContainer = styled.div`
    height: 200px;
    padding: 20px 0;
    display: flex;
    align-items: center;
    justify-content: center;
`

export const Picture = styled(Avatar)`
    width: 200px !important;
    height: 200px !important;
`

export const Search = styled.div`
    display: flex;
    align-items: center;
    width: 90%;
    margin: 10px auto;
    height: 40px;
    background-color: #fff;
    border-radius: 20px;

    .MuiSvgIcon-root {
        margin: 0 25px 0 20px;
        color: #777;
        font-size: 20px;
    }
`

export const SearchInput = styled.input`
    border: none;
    outline: none;
    background: none;
    flex: 1;
`

export const MessagesContainer = styled.div`
    overflow: scroll;

    ::-webkit-scrollbar {
        width: 0px;
    }
` 
