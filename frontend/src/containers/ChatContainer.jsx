import React, { useState, useEffect, useContext } from 'react';
import Fuse from 'fuse.js';
import ScrollToBottom from 'react-scroll-to-bottom'

import { UserContext } from '../context/userContext';
import { Header, Dropdown, Dropside, Chat, Form } from '../components';

import { createMessage } from '../services/messages';
import { deleteRoom, updateRoom } from '../services/rooms';

import { IconButton } from '@material-ui/core';
import { MoreVert, SearchOutlined } from '@material-ui/icons';
import InsertEmotionIcon from '@material-ui/icons/InsertEmoticon';
import MicIcon from '@material-ui/icons/Mic';
import CloseIcon from '@material-ui/icons/Close';

function ChatContainer({
    messages,
    currentRoom,
    setCurrentRoom,
    setRooms,
    showDrop,
    setShowDrop
}) {
    const { user } = useContext(UserContext);

    const [newMessage, setNewMessage] = useState('');

    const [groupContainer, setGroupContainer] = useState(false);
    const [searchContainer, setSearchContainer] = useState(false);

    const [searchMessage, setSearchMessage] = useState('');
    const [searchResults, setSearchResults] = useState([]);

    const [roomName, setRoomName] = useState('');
    const [roomImage, setRoomImage] = useState('')

    const [warning, setWarning] = useState('');

    useEffect(_ => {
        const fuse = new Fuse(messages, { keys: ['message'], })
        const results = fuse.search(searchMessage).map(({ item }) => item)

        if (results.length > 0) {
            setSearchResults(results);
        } else {
            setSearchResults([])
        }

    }, [searchMessage, messages]);

    useEffect(_ => {
        setRoomName(currentRoom?.name)
        setRoomImage(currentRoom?.image)
    }, [currentRoom]);

    function showWarning(error) {
        setWarning(error)
        setTimeout(_ => {
            setWarning('')
        }, 2000)
    };

    function sendMessage(e) {
        e.preventDefault();

        const data = {
            message: newMessage,
            username: user.username,
            room_id: currentRoom._id,
        };

        createMessage(data);
        setNewMessage('');
    };

    function handleUpdateRoom(e) {
        e.preventDefault();

        const data = {
            username: user.username,
            _id: currentRoom._id,
            data: {
                name: roomName,
                image: roomImage
            },
        };

        updateRoom(data).then(response => {
            const { rooms, error } = response;

            if (error) {
                setWarning(error)
            };

            const roomUpdated = rooms.filter(room => room._id === currentRoom._id ? room : null)[0]

            setRooms(rooms);
            setCurrentRoom(roomUpdated);
        });
    };

    function handleDeleteRoom() {
        const data = {
            room: currentRoom,
            username: user.username
        };

        deleteRoom(data).then(response => {
            const { error } = response;

            if (error) {
                showWarning(error);
                return;
            };

            hiddenDrop()
        });
    };

    function toggleContainer(container) {
        if (container === 'group') {
            setGroupContainer(true);
            setSearchContainer(false);
        } else {
            setGroupContainer(false);
            setSearchContainer(true);
        };
    };

    function hiddenDrop() {
        if (showDrop === '' || showDrop === 'profile-container' || showDrop === 'newchat-container') return;
        setShowDrop('');
      };

    return (
        <>
            <Chat.Container onClick={_ => hiddenDrop()}>
                <Header borderBottom padding="none">
                    <IconButton onClick={_ => toggleContainer('group')}>
                        <Header.Picture src={currentRoom?.image} />
                    </IconButton>

                    <Header.Info>
                        <Header.RoomName>{currentRoom?.name}</Header.RoomName>
                        <Header.LastMessage>
                            {messages[messages.length - 1]?.room_id === currentRoom?._id ?
                                messages[messages.length - 1]?.message : null
                            }
                        </Header.LastMessage>
                    </Header.Info>

                    <Header.Right>
                        <IconButton onClick={_ => toggleContainer('search')}>
                            <SearchOutlined />
                        </IconButton>

                        <div style={{ position: 'relative' }}>
                            <IconButton onClick={_ => setShowDrop('group-dropdown')}>
                                <MoreVert />
                            </IconButton>

                            <Dropdown showDropdown={showDrop === 'group-dropdown'}>
                                <Dropdown.Item onClick={_ => toggleContainer('group')}>
                                    Group Info
                                </Dropdown.Item>

                                <Dropdown.Item onClick={_ => handleDeleteRoom()}>
                                    Delete room
                                </Dropdown.Item>
                            </Dropdown>
                        </div>
                    </Header.Right>

                </Header>
                <ScrollToBottom className="scroll-to-bottom">
                    <Chat>
                        {warning ? <Chat.Warning>{warning}</Chat.Warning> : null}

                        {messages?.map(message => {
                            return (
                                message.username === user.username ?
                                    <Chat.MessageSender key={`${message.username}-${message.timestamp}`}>
                                        {message.message}
                                        <Chat.TimeStamp>{message.timestamp}</Chat.TimeStamp>
                                    </Chat.MessageSender>
                                    :
                                    <Chat.Message key={`${message.username}-${message.timestamp}`}>
                                        <Chat.Username>{message.username}</Chat.Username>
                                        {message.message}
                                        <Chat.TimeStamp>{message.timestamp}</Chat.TimeStamp>
                                    </Chat.Message>
                            )
                        })}
                    </Chat>
                </ScrollToBottom>
                <Form.MessageContainer>
                    <InsertEmotionIcon />
                    <Form.Message>
                        <Form.MessageInput placeholder="Type a message" value={newMessage} onChange={e => setNewMessage(e.target.value)} />
                        <Form.MessageButton onClick={sendMessage} type="submit">
                            Send a message
                        </Form.MessageButton>
                    </Form.Message>
                    <MicIcon />
                </Form.MessageContainer>
            </Chat.Container>
            {searchContainer ?
                <Dropside position="none" width="30vw" onClick={_ => hiddenDrop()}>
                    <Header padding="none" backgroundColor="#fff">
                        <Dropside.SearchTitle>
                            <CloseIcon onClick={_ => setSearchContainer(false)} />
                            Search messages
                        </Dropside.SearchTitle>
                    </Header>

                    <Form.Container borderBottom>
                        <Form.Search>
                            <SearchOutlined />
                            <Form.SearchInput
                                value={searchMessage}
                                onChange={e => setSearchMessage(e.target.value)}
                                placeholder="Search..."
                            />
                        </Form.Search>
                    </Form.Container>

                    <Dropside.MessagesContainer>
                        {searchResults?.map(message => {
                            return (
                                message.username === user.username ?
                                    <Chat.MessageSender key={`${message.username}-${message.timestamp}`}>
                                        {message.message}
                                        <Chat.TimeStamp>{message.timestamp}</Chat.TimeStamp>
                                    </Chat.MessageSender>
                                    :
                                    <Chat.Message key={`${message.username}-${message.timestamp}`}>
                                        <Chat.Username>{message.username}</Chat.Username>
                                        {message.message}
                                        <Chat.TimeStamp>{message.timestamp}</Chat.TimeStamp>
                                    </Chat.Message>
                            )
                        })}
                    </Dropside.MessagesContainer>
                </Dropside>
                :
                groupContainer ?
                    <Dropside position="none" width="30vw">
                        <Header padding="none" backgroundColor="#f7f7f7">
                            <Dropside.SearchTitle>
                                <CloseIcon onClick={_ => setGroupContainer(false)} />
                                Group Info
                            </Dropside.SearchTitle>
                        </Header>

                        <Dropside.PictureContainer>
                            <Dropside.Picture src={roomImage} />
                        </Dropside.PictureContainer>

                        <Form.Container onSubmit={handleUpdateRoom} backgroundColor="#ededed">
                            <Form.Label>Chat name</Form.Label>
                            <Form.DropsideInput value={roomName} onChange={e => setRoomName(e.target.value)} />

                            <Form.Label>Chat image URL</Form.Label>
                            <Form.DropsideInput value={roomImage} onChange={e => setRoomImage(e.target.value)} />

                            <Form.DropsideSubmit>Change</Form.DropsideSubmit>
                        </Form.Container>
                    </Dropside>
                    :
                    null
            }
        </>
    );
}

export default ChatContainer;
