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

function Sidebar({ user, setRoom, rooms }) {
    return (
        <Container>
            <Header>
                <Header.Avatar src={user?.imageUrl} />
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
                {rooms.map(room => (
                    <SidebarChat key={room._id} name={room.name} onClick={e => setRoom(room.name)} />
                ))}
            </Chats>
        </Container>
    );
}

export default Sidebar
