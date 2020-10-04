import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import axios from '../../contants/axios';

import Header from '../Header';
import SidebarChat from '../SidebarChat';
import Form from '../Form';

import {
    Container,
    Search,
    SearchContainer,
    SearchInput,
    Chats,
    NewChat
} from './styles';
import { SearchOutlined } from '@material-ui/icons';
import DonutLargeIcon from '@material-ui/icons/DonutLarge';
import ChatIcon from '@material-ui/icons/Chat';
import MoreVertIcon from '@material-ui/icons/MoreVert';

function Sidebar({ user, setUser, setRoom, rooms, setRooms }) {
    const history = useHistory();
    const [showForm, setShowForm] = useState(false);

    const [name, setName] = useState('');
    const [image, setImage] = useState('');

    function Signout(e) {
        e.preventDefault();

        localStorage.removeItem('authUser');
        setUser(undefined);
        history.push('/');
    };

    async function createRoom(e) {
        e.preventDefault();

        await axios.post('/api/rooms/create', { name, image })
        await axios.get('/api/rooms/get')
            .then(resp => {
                setRooms(resp.data)
                setRoom(resp.data[resp.data.length - 1])
            });

        setShowForm(false);
    }

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
                    <NewChat onClick={_ => setShowForm(!showForm)}>{showForm ? 'x' : '+'}</NewChat>
                </SearchContainer>
            </Search>
            {showForm ?
                <Form onSubmit={createRoom}>
                    <Form.Input
                        padding="15px 5px"
                        margin="1px 0"
                        bg="#fff"
                        placeholder="name room"
                        value={name}
                        onChange={e => setName(e.target.value)}
                    />
                    <Form.Input
                        padding="15px 5px"
                        margin="1px 0"
                        bg="#fff"
                        placeholder="image Url (optional)"
                        value={image}
                        onChange={e =>
                            setImage(e.target.value)}
                    />
                    <Form.Submit margin={'3px 0 15px 0'} type="submit">Create Room</Form.Submit>
                </Form>
                :
                null
            }
            <Chats>
                {rooms.map(room => (
                    <SidebarChat room={room} key={room._id} onClick={_ => setRoom(room)} />
                ))}
            </Chats>
        </Container>
    );
}

export default Sidebar
