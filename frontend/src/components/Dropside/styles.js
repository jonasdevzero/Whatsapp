import styled from 'styled-components/macro';
import { Avatar } from '@material-ui/core';

export const Container = styled.div`
    position: absolute;
    left: -30%;
    flex: .3;
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
    background-color: green;
    border-radius: 5px;
    width: 125px;
    height: 48px;
    margin: 15px auto;
    cursor: pointer;
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