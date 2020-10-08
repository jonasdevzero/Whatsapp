import styled from 'styled-components/macro';
import { Avatar } from '@material-ui/core';

export const Container = styled.div`
    display: flex;
    justify-content: space-between;
    padding: ${({ padding }) => padding ? padding : '10px 20px'};
    border-right: ${({ borderBottom }) => borderBottom ? 'none' : '1px solid lightgray'};
    border-bottom: ${({ borderBottom }) => borderBottom && '1px solid lightgray'};
    background-color: ${({ backgroundColor }) => backgroundColor ? backgroundColor : ''}
`;

export const Right = styled.div`
    display: flex;
    align-items: center;

    .MuiSvgIcon-root {
        font-size: 24px !important;
    };

    .MuiIconButton-root {
        margin-right: 10px;
    };

    .MuiButtonBase-root {
        position: relative;
    };
`;

export const Info = styled.div`
    display: flex;
    align-items: start;
    justify-content: center;
    flex-direction: column;
    flex: 1;
    padding-left: 10px;
    overflow: hidden;
`;

export const Picture = styled(Avatar)`
    cursor: pointer;
    width: 45px !important;
    height: 45px !important;
`

export const RoomName = styled.h3`
    margin-bottom: 4px;
    font-weight: 500;
`;

export const LastMessage = styled.p`
    color: gray;
`;