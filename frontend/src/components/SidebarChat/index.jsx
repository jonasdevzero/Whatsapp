import React from 'react';

import {
    Container,
    SidebarChatInfo,
    RoomName,
} from './styles';
import { Avatar } from '@material-ui/core';

function SidebarChat({ name, ...props }) {
    return (
        <Container {...props}>
            <Avatar />
            <SidebarChatInfo>
                <RoomName>{name}</RoomName>
            </SidebarChatInfo>
        </Container>
    );
}

export default SidebarChat;
