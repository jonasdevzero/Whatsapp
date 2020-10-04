import styled from 'styled-components/macro';

export const Container = styled.div`
    display: flex;
    padding: 20px;
    cursor: pointer;
    border-bottom: 1px solid #f6f6f6;

    &:hover {
        background-color: #ebebeb;
    }
`;

export const SidebarChatInfo = styled.div`
    margin-left: 15px;
`;

export const RoomName = styled.h2`
    font-size: 16px;
    margin-bottom: 8px;
`;