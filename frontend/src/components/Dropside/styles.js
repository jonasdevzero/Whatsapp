import styled from 'styled-components/macro';
import { Avatar } from '@material-ui/core';

export const Container = styled.div`
    position: ${({ position }) => position ? position : 'absolute'};
    width: ${({ width }) => width ? width : '100%'};
    height: 100%;
    left: -100%;
    z-index: 100;
    background-color: #ededed;

    transition: left .7s ease;
    ${({ showContainer }) => showContainer ? 'left: 0px' : null};
`;

export const TitleContainer = styled.div`
    height: 140px;
    display: flex;
    align-items: flex-end;
    padding: 28px;
    background-color: #fff;
`;

export const Title = styled.h1`
    font-size: 24px;
    font-weight: 700;
    display: flex;
    align-items: center;
    color: #777;

    .MuiSvgIcon-root {
        margin-right: 35px;
        cursor: pointer;
    };
`;

export const SearchTitle = styled.h1`
    font-weight: 500;
    font-size: 20px;
    display: flex;
    align-items: center;
    color: #777;
    padding: 9.1px;

    .MuiSvgIcon-root {
        margin-right: 35px;
        cursor: pointer;
    };
`;

export const PictureContainer = styled.div`
    height: 240px;
    padding: 20px 0;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #ededed;
`;

export const Picture = styled(Avatar)`
    width: 200px !important;
    height: 200px !important;
`;

export const MessagesContainer = styled.div`
    overflow: scroll;
    height: calc(100% - 160px);

    ::-webkit-scrollbar {
        width: 0px;
    };
` ;
