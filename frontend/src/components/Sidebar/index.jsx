import React from 'react'

import {
    Container,
    Chats,
} from './styles';

function Sidebar({ children, ...props }) {
    return <Container {...props}>{children}</Container>
}

Sidebar.Chats = function SidebarChats({ children, ...props }) {
    return <Chats {...props}>{children}</Chats>
}

export default Sidebar
