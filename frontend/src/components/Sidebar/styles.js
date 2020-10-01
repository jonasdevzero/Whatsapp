import styled from 'styled-components/macro';

export const Container = styled.div`
    display: flex;
    flex-direction: column;
    flex: .35;
`;

export const Search = styled.div`
    display: flex;
    align-items: center;
    background-color: #f6f6f6;
    height: 39px;
    padding: 10px;
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
    }
`;

export const SearchInput = styled.input`
    border: none;
    outline: none;
    margin-left: 10px;
    flex-grow: 1;
`;

export const Chats = styled.div`
    flex: 1;
    background-color: #fff;
    overflow-y: scroll;

    ::-webkit-scrollbar {
        width: 0px;
    }
`;