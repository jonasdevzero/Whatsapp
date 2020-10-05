import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import axios from '../../contants/axios';
import Fuse from 'fuse.js'

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
    user,
    setUser,
    setRoom,
    rooms,
    setRooms,
    showDropdown,
    setShowDropdown,
    resetState
}) {
    const [profile, setProfile] = useState(false);
    const [newRoom, setNewRoom] = useState(false);

    const [name, setName] = useState(user.name);
    const [imageUrl, setImageUrl] = useState(user.imageUrl);
    const [roomName, setRoomName] = useState('');
    const [roomImage, setRoomImage] = useState('');
    const [search, setSearch] = useState('');
    const [searchResults, setSearchResults] = useState([])

    const history = useHistory();

    useEffect(_ => {
        const fuse = new Fuse(rooms, { keys: ['name'] })

        const results = fuse.search(search).map(({ item }) => item)

        if (rooms.length > 0 && search.length > 0 && results.length > 0) {
            setSearchResults(results);
        } else {
            setSearchResults([])
        }

    }, [search]);

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
        setProfile(false);
    };

    async function createRoom(e) {
        e.preventDefault();

        await axios.post('/api/rooms/create', { name: roomName, image: roomImage })
        await axios.get('/api/rooms/get')
            .then(resp => {
                setRooms(resp.data)
                setRoom(resp.data[resp.data.length - 1])
            });

        setProfile(false);
        setNewRoom(false);
        setRoomName('');
        setRoomImage('');
    }

    return (
        <>
            <Dropside profile={profile ? ' ' : ''}>

                <Dropside.TitleContainer>
                    <Dropside.Title>
                        <ArrowBackIcon onClick={_ => setProfile(false)} />
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

            <Dropside newRoom={newRoom}>
                <Dropside.TitleContainer>
                    <Dropside.Title>
                        <ArrowBackIcon onClick={_ => setNewRoom(false)} />
                            New chat
                        </Dropside.Title>
                </Dropside.TitleContainer>

                <Dropside.Form onSubmit={createRoom}>
                    <Dropside.Label>Chat name</Dropside.Label>
                    <Dropside.Input value={roomName} onChange={e => setRoomName(e.target.value)} />

                    <Dropside.Label>Image Url</Dropside.Label>
                    <Dropside.Input value={roomImage} onChange={e => setRoomImage(e.target.value)} />

                    <Dropside.Submit>Create</Dropside.Submit>
                </Dropside.Form>
            </Dropside>

            <Container onClick={_ => resetState()}>
                <Header padding="0">
                    <IconButton onClick={_ => setProfile(true)}>
                        <Header.Picture src={user?.imageUrl} />
                    </IconButton>
                    <Header.Right>
                        <IconButton>
                            <DonutLargeIcon />
                        </IconButton>
                        <IconButton onClick={_ => setNewRoom(true)}>
                            <ChatIcon />
                        </IconButton>
                        <IconButton onClick={_ => setShowDropdown(!showDropdown)}>
                            <MoreVertIcon />
                        </IconButton>
                    </Header.Right>
                    <Dropdown showDropdown={showDropdown}>
                        <Dropdown.Item onClick={_ => setProfile(true)}>
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
                        <SearchInput value={search} onChange={e => setSearch(e.target.value)} placeholder="Search or start new chat" type="text" />
                    </SearchContainer>
                </Search>
                <Chats>
                    {
                        searchResults.length > 0 ?
                            searchResults.map(room => (
                                <SidebarChat room={room} key={room._id} onClick={_ => setRoom(room)} />
                            ))
                            :
                            rooms.map(room => (
                                <SidebarChat room={room} key={room._id} onClick={_ => setRoom(room)} />
                            ))
                    }
                </Chats>
            </Container>
        </>
    );
}

export default Sidebar
