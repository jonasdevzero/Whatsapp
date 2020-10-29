import React, { useState, useEffect, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import Fuse from 'fuse.js';

import { updateUser } from '../services/user';
import { createRoom } from '../services/rooms';

import { UserContext } from '../context/userContext';
import { Header, Sidebar, Form, Dropdown, Dropside } from '../components';

import { IconButton } from '@material-ui/core';
import { SearchOutlined, DonutLarge, Chat, MoreVert, ArrowBack } from '@material-ui/icons';

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

    // search rooms
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

    function handleUpdateUser(e) {
        e.preventDefault();

        const data = {
            username: user.username,
            name,
            imageUrl
        };

        updateUser(data).then(response => {
            const { user } = response;
            setUser(user);
        });

        setProfileContainer(false);
    };

    function handleCreateRoom(e) {
        e.preventDefault();

        const data = {
            name: newRoomName,
            image: newRoomImage,
            createdBy: user.username
        };

        createRoom(data).then(response => {
            const { rooms } = response;
            setRooms(rooms);
            setCurrentRoom(rooms[rooms.length - 1]);
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
                        <ArrowBack onClick={_ => setProfileContainer(false)} />
                            Profile
                        </Dropside.Title>
                </Dropside.TitleContainer>
                <Dropside.PictureContainer>
                    <Dropside.Picture src={user?.imageUrl} />
                </Dropside.PictureContainer>
                <Form.Container onSubmit={handleUpdateUser} backgroundColor="#ededed">
                    <Form.Label>Your name</Form.Label>
                    <Form.DropsideInput value={name} onChange={e => setName(e.target.value)} />

                    <Form.Label>You image URL</Form.Label>
                    <Form.DropsideInput value={imageUrl} onChange={e => setImageUrl(e.target.value)} />

                    <Form.DropsideSubmit>Change</Form.DropsideSubmit>
                </Form.Container>
            </Dropside>
            <Dropside showContainer={newRoomContainer} onClick={_ => hiddenDropdown()}>
                <Dropside.TitleContainer>
                    <Dropside.Title>
                        <ArrowBack onClick={_ => setNewRoomContainer(false)} />
                            New chat
                    </Dropside.Title>
                </Dropside.TitleContainer>
                <Form.Container onSubmit={handleCreateRoom} backgroundColor="#ededed">
                    <Form.Label>Chat name</Form.Label>
                    <Form.DropsideInput value={newRoomName} onChange={e => setNewRoomName(e.target.value)} required />

                    <Form.Label>Image Url</Form.Label>
                    <Form.DropsideInput value={newRoomImage} onChange={e => setNewRoomImage(e.target.value)} />

                    <Form.DropsideSubmit>Create</Form.DropsideSubmit>
                </Form.Container>
            </Dropside>
            <Header padding="0">
                <IconButton onClick={_ => setProfileContainer(true)}>
                    <Header.Picture src={user?.imageUrl} />
                </IconButton>
                <Header.Right>
                    <IconButton>
                        <DonutLarge />
                    </IconButton>
                    <IconButton onClick={_ => setNewRoomContainer(true)}>
                        <Chat />
                    </IconButton>
                    <IconButton onClick={_ => setProfileDropdown(!profileDropdown)}>
                        <MoreVert />
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
            <div style={{ backgroundColor: 'rgb(247, 247, 247' }}>
                <Form.Search>
                    <SearchOutlined />
                    <Form.SearchInput
                        value={search}
                        onChange={e => setSearch(e.target.value)}
                        placeholder="Search or start new chat"
                        type="text"
                    />
                </Form.Search>
            </div>
            <Sidebar.Chats>
                {
                    searchResults.length > 0 ?
                        searchResults?.map(room => ( // filtered rooms
                            <Sidebar.Chat key={room._id} onClick={_ => setCurrentRoom(room)}>
                                <Sidebar.RoomImage src={room?.image} />
                                <Sidebar.RoomName>{room?.name}</Sidebar.RoomName>
                            </Sidebar.Chat>
                        ))
                        :
                        rooms?.map(room => ( // All rooms
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
