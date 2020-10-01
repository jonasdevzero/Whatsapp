import React from 'react';

import Header from '../Header'
import SidebarChat from '../SidebarChat'

import {
    Container,
    Search,
    SearchContainer,
    SearchInput,
    Chats,
} from './styles';
import { SearchOutlined } from '@material-ui/icons';
import DonutLargeIcon from '@material-ui/icons/DonutLarge';
import ChatIcon from '@material-ui/icons/Chat';
import MoreVertIcon from '@material-ui/icons/MoreVert';

function Sidebar() {
    return (
        <Container>
            <Header>
                <Header.Avatar src="https://avatars1.githubusercontent.com/u/71522380?s=460&u=493d15eafc9c9e67c5bc1ef807ce60e0c06ba938&v=4" />
                <Header.Right>
                        <DonutLargeIcon />
                        <ChatIcon />
                        <MoreVertIcon />
                </Header.Right>
            </Header>
            <Search>
                <SearchContainer>
                    <SearchOutlined />
                    <SearchInput placeholder="Search or start new chat" type="text" />
                </SearchContainer>
            </Search>
            <Chats>
                <SidebarChat />
                <SidebarChat />
                <SidebarChat />
            </Chats>
        </Container>
    );
}

export default Sidebar
