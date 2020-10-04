import React from 'react';

import {
    Container,
    SidebarChatInfo,
    RoomName,
} from './styles';
import { Avatar } from '@material-ui/core';

function SidebarChat({ room, ...props }) {
    return (
        <Container {...props}>
            <Avatar src={room?.image} />
            <SidebarChatInfo>
                <RoomName>{room.name}</RoomName>
            </SidebarChatInfo>
        </Container>
    );
}

export default SidebarChat;
