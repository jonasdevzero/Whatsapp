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

export const Chat = styled.div`
    display: flex;
    padding: 20px;
    cursor: pointer;
    border-bottom: 1px solid #f6f6f6;

    &:hover {
        background-color: #ebebeb;
    }
`;

export const RoomName = styled.h2`
    font-size: 16px;
    margin-bottom: 8px;
    margin-left: 10px;
    text-align: center;
`;