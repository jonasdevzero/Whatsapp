import React, { useState, useEffect, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import axios from '../../constants/axios';
import Fuse from 'fuse.js'

import { UserContext } from '../../context/userContext';
import { Header, SidebarChat, Dropdown, Dropside } from '../';

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
import ArrowBackIcon from '@material-ui/icons/ArrowBack';

function Sidebar({
    setCurrentRoom,
    rooms,
    setRooms,
    profileDropdown,
    setProfileDropdown,
    hideDropdown
}) {
    const { user, setUser } = useContext(UserContext);

    const [profileContainer, setProfileContainer] = useState(false);
    const [newRoomContainer, setNewRoomContainer] = useState(false);

    const [name, setName] = useState(user.name);
    const [imageUrl, setImageUrl] = useState(user.imageUrl);

    const [newRoomName, setNewRoomName] = useState('');
    const [newRoomImage, setNewRoomImage] = useState('');

    const [search, setSearch] = useState('');
    const [searchResults, setSearchResults] = useState([])

    const history = useHistory();

    useEffect(_ => {
        const fuse = new Fuse(rooms, { keys: ['name'] })
        const results = fuse.search(search).map(({ item }) => item)

        if (results.length > 0) {
            setSearchResults(results);
        } else {
            setSearchResults([])
        }

    }, [search, rooms]);

    function signOut(e) {
        e.preventDefault();

        localStorage.removeItem('authUser');
        setUser(undefined);
        history.push('/');
    };

    async function updateUser(e) {
        e.preventDefault();

        await axios.post('/api/user/update', { username: user.username, name, imageUrl })
            .then(resp => {
                localStorage.setItem('authUser', JSON.stringify(resp.data.userUpdated))
                setUser(resp.data.userUpdated)
            })
        setProfileContainer(false);
    };

    async function createRoom(e) {
        e.preventDefault();

        await axios.post('/api/rooms/create', { 
            name: newRoomName, 
            image: newRoomImage, 
            createdBy: user.username 
        });
        await axios.get('/api/rooms/get')
            .then(resp => {
                setRooms(resp.data)
                setCurrentRoom(resp.data[resp.data.length - 1])
            });

        setProfileContainer(false);
        setNewRoomContainer(false);

        setNewRoomName('');
        setNewRoomImage('');
    };

    return (
        <>
            <Dropside showContainer={profileContainer} onClick={_ => hideDropdown()}> 

                <Dropside.TitleContainer>
                    <Dropside.Title>
                        <ArrowBackIcon onClick={_ => setProfileContainer(false)} />
                        Profile
                    </Dropside.Title>
                </Dropside.TitleContainer>

                <Dropside.PictureContainer>
                    <Dropside.Picture src={user?.imageUrl} />
                </Dropside.PictureContainer>

                <Dropside.Form onSubmit={updateUser}>
                    <Dropside.Label>Your name</Dropside.Label>
                    <Dropside.Input value={name} onChange={e => setName(e.target.value)} />

                    <Dropside.Label>You image URL</Dropside.Label>
                    <Dropside.Input value={imageUrl} onChange={e => setImageUrl(e.target.value)} />

                    <Dropside.Submit>Change</Dropside.Submit>
                </Dropside.Form>

            </Dropside>

            <Dropside showContainer={newRoomContainer} onClick={_ => hideDropdown()}>
                <Dropside.TitleContainer>
                    <Dropside.Title>
                        <ArrowBackIcon onClick={_ => setNewRoomContainer(false)} />
                            New chat
                        </Dropside.Title>
                </Dropside.TitleContainer>

                <Dropside.Form onSubmit={createRoom}>
                    <Dropside.Label>Chat name</Dropside.Label>
                    <Dropside.Input value={newRoomName} onChange={e => setNewRoomName(e.target.value)} />

                    <Dropside.Label>Image Url</Dropside.Label>
                    <Dropside.Input value={newRoomImage} onChange={e => setNewRoomImage(e.target.value)} />

                    <Dropside.Submit>Create</Dropside.Submit>
                </Dropside.Form>
            </Dropside>

            <Container onClick={_ => hideDropdown()}>
                <Header padding="0">

                    <IconButton onClick={_ => setProfileContainer(true)}>
                        <Header.Picture src={user?.imageUrl} />
                    </IconButton>

                    <Header.Right>
                        <IconButton>
                            <DonutLargeIcon />
                        </IconButton>
                        <IconButton onClick={_ => setNewRoomContainer(true)}>
                            <ChatIcon />
                        </IconButton>
                        <IconButton onClick={_ => setProfileDropdown(!profileDropdown)}>
                            <MoreVertIcon />
                        </IconButton>
                    </Header.Right>

                    <Dropdown showDropdown={profileDropdown}>
                        <Dropdown.Item onClick={_ => setProfileContainer(true)}>
                            Profile
                        </Dropdown.Item>
                        <Dropdown.Item onClick={e => signOut(e)}>
                            Log out
                        </Dropdown.Item>
                    </Dropdown>

                </Header>

                <Search>
                    <SearchContainer>
                        <SearchOutlined />
                        <SearchInput 
                            value={search} 
                            onChange={e => setSearch(e.target.value)} 
                            placeholder="Search or start new chat" 
                            type="text" 
                        />
                    </SearchContainer>
                </Search>

                <Chats>
                    {
                        searchResults.length > 0 ?
                            searchResults.map(room => ( // filtered rooms
                                <SidebarChat room={room} key={room._id} onClick={_ => setCurrentRoom(room)} />
                            ))
                            :
                            rooms.map(room => ( // All rooms
                                <SidebarChat room={room} key={room._id} onClick={_ => setCurrentRoom(room)} />
                            ))
                    }
                </Chats>
            </Container>
        </>
    );
}

export default Sidebar
