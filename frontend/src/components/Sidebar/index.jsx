import React from 'react';
import { useHistory } from 'react-router-dom';

import { Header, SidebarChat, Dropdown } from '../';

import {
    Container,
    Search,
    SearchContainer,
    SearchInput,
    Chats,
} from './styles';

import { IconButton } from '@material-ui/core';
import { SearchOutlined } from '@material-ui/icons';

import DonutLargeIcon from '@material-ui/icons/DonutLarge';
import ChatIcon from '@material-ui/icons/Chat';
import MoreVertIcon from '@material-ui/icons/MoreVert';

function Sidebar({ 
    user, 
    setUser, 
    setRoom, 
    rooms, 
    setRooms, 
    showDropdown,
    setShowDropdown,
    resetState 
}) {
    const history = useHistory();

    function signOut(e) {
        e.preventDefault();

        localStorage.removeItem('authUser');
        setUser(undefined);
        history.push('/');
    };

    // async function createRoom(e) {
    //     e.preventDefault();

    //     await axios.post('/api/rooms/create', { name, image })
    //     await axios.get('/api/rooms/get')
    //         .then(resp => {
    //             setRooms(resp.data)
    //             setRoom(resp.data[resp.data.length - 1])
    //         });
    // }

    return (
        <Container onClick={_ => resetState()}>
            <Header>
                <Header.Picture src={user?.imageUrl} />
                <Header.Right>
                    <IconButton>
                        <DonutLargeIcon />
                    </IconButton>
                    <IconButton>
                        <ChatIcon />
                    </IconButton>
                    <IconButton onClick={_ => setShowDropdown(!showDropdown)}>
                        <MoreVertIcon />
                    </IconButton>
                </Header.Right>
                <Dropdown showDropdown={showDropdown}>
                    <Dropdown.Item onClick={e => signOut(e)}>
                        Log out
                    </Dropdown.Item>
                </Dropdown>
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
