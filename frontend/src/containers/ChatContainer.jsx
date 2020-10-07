import React, { useState, useEffect, useContext } from 'react';
import axios from '../constants/axios';
import Fuse from 'fuse.js';

import { UserContext } from '../context/userContext';
import { Header, Dropdown, Dropside, Chat, Form } from '../components'

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
    chatDropdown,
    setChatDropdown,
    hideDropdown
}) {
    const { user } = useContext(UserContext);

    const [newMessage, setNewMessage] = useState('');

    const [searchMessage, setSearchMessage] = useState('');
    const [searchContainer, setSearchContainer] = useState(false);
    const [searchResults, setSearchResults] = useState([]);

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

    async function sendMessage(e) {
        e.preventDefault();

        await axios.post('/api/messages/send', {
            message: newMessage,
            username: user.username,
            room_id: currentRoom._id,
        })

        setNewMessage('');
    };

    async function deleteRoom() {
        await axios.post('/api/rooms/delete', { room: currentRoom, username: user.username })
            .then(async resp => {
                const error = resp.data.error
                if (error) {
                    setWarning(error)
                    setTimeout(_ => {
                        setWarning('')
                    }, 2000)

                    return
                }

                await axios.get('/api/rooms/get')
                    .then(resp => {
                        const rooms = resp.data
                        setCurrentRoom(rooms[0])
                        setRooms(rooms)
                    })
            })

        hideDropdown()
    }

    return (
        <>
            <Chat.Container onClick={_ => hideDropdown()}>
                <Header borderBottom>
                    <Header.Picture src={currentRoom?.image} />
                    <Header.Info>
                        <Header.RoomName>{currentRoom?.name}</Header.RoomName>
                        <Header.LastMessage>
                            {messages[messages.length - 1]?.room_id === currentRoom._id ?
                                messages[messages.length - 1]?.message : null
                            }
                        </Header.LastMessage>
                    </Header.Info>
                    <Header.Right>
                        <IconButton onClick={_ => setSearchContainer(true)}>
                            <SearchOutlined />
                        </IconButton>
                        <IconButton onClick={_ => setChatDropdown(!chatDropdown)}>
                            <MoreVert />
                            <Dropdown showDropdown={chatDropdown}>
                                <Dropdown.Item onClick={_ => deleteRoom()}>Delete room</Dropdown.Item>
                            </Dropdown>
                        </IconButton>
                    </Header.Right>
                </Header>
                <Chat>
                    {warning ? <Chat.Warning>{warning}</Chat.Warning> : null}

                    {messages.map(message => {
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
                <Dropside position="none" width="30vw" onClick={_ => hideDropdown()}>
                    <Header>
                        <Dropside.SearchTitle>
                            <CloseIcon onClick={_ => setSearchContainer(false)} />
                            Search messages
                        </Dropside.SearchTitle>
                    </Header>
                    <Form borderBottom>
                        <Form.Search>
                            <SearchOutlined />
                            <Form.SearchInput
                                value={searchMessage}
                                onChange={e => setSearchMessage(e.target.value)}
                                placeholder="Search..."
                            />
                        </Form.Search>
                    </Form>
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
                null
            }
        </>
    );
}

export default ChatContainer;
