import React from 'react';
import { useHistory } from 'react-router-dom'; 

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

function Sidebar({ user, setUser, setRoom, rooms }) {
    const history = useHistory();

    function Signout(e) {
        e.preventDefault();

        localStorage.removeItem('authUser');
        setUser(undefined);
        history.push('/');
    };

    return (
        <Container>
            <Header>
                <Header.Profile>
                    <Header.Picture src={user?.imageUrl} />
                    <Header.Dropdown>
                        <Header.Signout onClick={Signout}>Sign out</Header.Signout>
                </Header.Dropdown>
                </Header.Profile>
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
                    <SidebarChat room={room} key={room._id} onClick={_ => setRoom(room)} />
                ))}
            </Chats>
        </Container>
    );
}

export default Sidebar
