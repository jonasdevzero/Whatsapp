import React from 'react';

import { 
    Container,
    SidebarChatInfo,
    RoomName,
    LastMessage,
} from './styles';
import { Avatar } from '@material-ui/core';

function SidebarChat() {
    return (
        <Container>
            <Avatar />
            <SidebarChatInfo>
                <RoomName>Room name</RoomName>
                <LastMessage>Yoooo</LastMessage>
            </SidebarChatInfo>
        </Container>
    );
}

export default SidebarChat;
