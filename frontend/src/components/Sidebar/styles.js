import styled from 'styled-components/macro';

export const Container = styled.div`
    display: flex;
    flex-direction: column;
    flex: .3;
    position: relative;
`;

export const Chats = styled.div`
    flex: 1;
    background-color: #fff;
    overflow-y: scroll;

    ::-webkit-scrollbar {
        width: 0px;
    }
`;