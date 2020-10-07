import React from 'react'

import { Avatar } from '@material-ui/core';

import {
    Container,
    Chats,
    Chat, 
    RoomName
} from './styles';

function Sidebar({ children, ...props }) {
    return <Container {...props}>{children}</Container>;
};

Sidebar.Chats = function SidebarChats({ children, ...props }) {
    return <Chats {...props}>{children}</Chats>;
};

Sidebar.Chat = function SidebarChat({ children, ...props }) {
    return <Chat {...props}>{children}</Chat>;
};

Sidebar.RoomImage = function SidebarRoomImage({ src }) {
    return <Avatar src={src} />;
};

Sidebar.RoomName = function SidebarRoomName({ children, ...props }) {
    return <RoomName {...props}>{children}</RoomName>;
};

export default Sidebar
