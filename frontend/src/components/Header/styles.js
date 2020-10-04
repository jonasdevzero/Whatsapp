import styled from 'styled-components/macro';
import { Avatar } from '@material-ui/core';

export const Container = styled.div`
    display: flex;
    justify-content: space-between;
    padding: 20px;
    border-right: ${({ borderBottom }) => borderBottom ? 'none' : '1px solid lightgray'};
    border-bottom: ${({ borderBottom }) => borderBottom && '1px solid lightgray'};
    position: relative;
`;

export const Right = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    min-width: 10vw;

    .MuiSvgIcon-root {
        font-size: 24px !important;
    };

    .MuiIconButton-root {
        margin-right: 2vw;
    };
`;

export const Info = styled.div`
    display: flex;
    align-items: start;
    flex-direction: column;
    flex: 1;
    padding-left: 20px;
    overflow: hidden;
`;

export const Dropdown = styled.div`
    display: none;
    position: absolute;
    background-color: #fff;
    padding: 15px 10px;
    top: 38px;
    left: 10px;
    width: 100px;

    &:hover {
        display: flex;
        flex-direction: column;
    }
`

export const Picture = styled(Avatar)`
    cursor: pointer;
`

export const Profile = styled.div`
    position: relative;

    button {
        cursor: pointer;
    }

    &:hover > ${Dropdown} {
        display: flex;
        flex-direction: column;
    }
`

export const Signout = styled.a`
    cursor: pointer;

    &:hover {
        font-weight: bold; 
    }
`