import React, { useState, useEffect, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import axios from '../constants/axios';
import Fuse from 'fuse.js';

import { UserContext } from '../context/userContext';
import { Header, Sidebar, Form, Dropdown, Dropside } from '../components';
import * as ROUTES from '../constants/routes';

import { IconButton } from '@material-ui/core';
import { SearchOutlined } from '@material-ui/icons';
import DonutLargeIcon from '@material-ui/icons/DonutLarge';
import ChatIcon from '@material-ui/icons/Chat';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';

function SidebarContainer({
    setCurrentRoom,
    rooms,
    setRooms,
    profileDropdown,
    setProfileDropdown,
    hiddenDropdown
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

        await axios.post(ROUTES.UPDATE_USER, { username: user.username, name, imageUrl })
            .then(resp => {
                localStorage.setItem('authUser', JSON.stringify(resp.data.userUpdated))
                setUser(resp.data.userUpdated)
            })
        setProfileContainer(false);
    };

    async function createRoom(e) {
        e.preventDefault();

        await axios.post(ROUTES.CREATE_ROOM, {
            name: newRoomName,
            image: newRoomImage,
            createdBy: user.username
        });
        await axios.get(ROUTES.GET_ROOMS)
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
        <Sidebar onClick={_ => hiddenDropdown()}>
            <Dropside showContainer={profileContainer} onClick={_ => hiddenDropdown()}>
                <Dropside.TitleContainer>
                    <Dropside.Title>
                        <ArrowBackIcon onClick={_ => setProfileContainer(false)} />
                            Profile
                        </Dropside.Title>
                </Dropside.TitleContainer>
                <Dropside.PictureContainer>
                    <Dropside.Picture src={user?.imageUrl} />
                </Dropside.PictureContainer>
                <Form onSubmit={updateUser} backgroundColor="#ededed">
                    <Form.Label>Your name</Form.Label>
                    <Form.DropsideInput value={name} onChange={e => setName(e.target.value)} />

                    <Form.Label>You image URL</Form.Label>
                    <Form.DropsideInput value={imageUrl} onChange={e => setImageUrl(e.target.value)} />

                    <Form.DropsideSubmit>Change</Form.DropsideSubmit>
                </Form>
            </Dropside>
            <Dropside showContainer={newRoomContainer} onClick={_ => hiddenDropdown()}>
                <Dropside.TitleContainer>
                    <Dropside.Title>
                        <ArrowBackIcon onClick={_ => setNewRoomContainer(false)} />
                            New chat
                    </Dropside.Title>
                </Dropside.TitleContainer>
                <Form onSubmit={createRoom} backgroundColor="#ededed">
                    <Form.Label>Chat name</Form.Label>
                    <Form.DropsideInput value={newRoomName} onChange={e => setNewRoomName(e.target.value)} required />

                    <Form.Label>Image Url</Form.Label>
                    <Form.DropsideInput value={newRoomImage} onChange={e => setNewRoomImage(e.target.value)} />

                    <Form.DropsideSubmit>Create</Form.DropsideSubmit>
                </Form>
            </Dropside>
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
                        <Dropdown showDropdown={profileDropdown}>
                            <Dropdown.Item onClick={_ => setProfileContainer(true)}>
                                Profile
                            </Dropdown.Item>
                            <Dropdown.Item onClick={_ => setNewRoomContainer(true)}>
                                New chat
                            </Dropdown.Item>
                            <Dropdown.Item onClick={e => signOut(e)}>
                                Log out
                            </Dropdown.Item>
                        </Dropdown>
                    </IconButton>
                </Header.Right>
            </Header>
            <Form>
                <Form.Search>
                    <SearchOutlined />
                    <Form.SearchInput
                        value={search}
                        onChange={e => setSearch(e.target.value)}
                        placeholder="Search or start new chat"
                        type="text"
                    />
                </Form.Search>
            </Form>
            <Sidebar.Chats>
                {
                    searchResults.length > 0 ?
                        searchResults.map(room => ( // filtered rooms
                            <Sidebar.Chat key={room._id} onClick={_ => setCurrentRoom(room)}>
                                <Sidebar.RoomImage src={room?.image} />
                                <Sidebar.RoomName>{room?.name}</Sidebar.RoomName>
                            </Sidebar.Chat>
                        ))
                        :
                        rooms.map(room => ( // All rooms
                            <Sidebar.Chat key={room._id} onClick={_ => setCurrentRoom(room)}>
                                <Sidebar.RoomImage src={room?.image} />
                                <Sidebar.RoomName>{room?.name}</Sidebar.RoomName>
                            </Sidebar.Chat>
                        ))
                }
            </Sidebar.Chats>
        </Sidebar>
    );
}

export default SidebarContainer;
