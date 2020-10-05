import React, { useState, useEffect } from 'react';
import axios from '../../contants/axios';
import Fuse from 'fuse.js';

import { Header, Dropdown, Dropside } from '../'

import {
    Container,
    RoomName,
    LastMessage,
    Content,
    Message,
    MessageReciver,
    User,
    TimeStamp,
    FormContainer,
    Form,
    Input,
    Button,
    Warning,
} from './styles';
import { IconButton } from '@material-ui/core';
import { MoreVert, SearchOutlined } from '@material-ui/icons';
import InsertEmotionIcon from '@material-ui/icons/InsertEmoticon';
import MicIcon from '@material-ui/icons/Mic';
import CloseIcon from '@material-ui/icons/Close';

function Chat({
    messages,
    user,
    room,
    setRoom,
    setRooms,
    showDropdown2,
    setShowDropdown2,
    resetState
}) {
    const [inputMessage, setInputMessage] = useState('');
    const [search, setSearch] = useState('');
    const [searchContainer, setSearchContainer] = useState(false);
    const [searchResults, setSearchResults] = useState([]);

    const [warning, setWarning] = useState(false);
    const [messageError, setMessageError] = useState('')

    useEffect(_ => {
        const fuse = new Fuse(messages, { keys: ['message'], })

        const results = fuse.search(search).map(({ item }) => item)

        if (messages.length > 0 && search.length > 0 && results.length > 0) {
            setSearchResults(results);
        } else {
            setSearchResults([])
        }

    }, [search, messages]);

    async function sendMessage(e) {
        e.preventDefault();

        await axios.post('/api/messages/send', {
            message: inputMessage,
            username: user.username,
            room_id: room._id,
        })

        setInputMessage('');
    };

    async function deleteRoom() {
        await axios.post('/api/rooms/delete', { room, username: user.username, _id: room._id })
            .then(async resp => {
                const error = resp.data.error
                if (error) {
                    setWarning(true)
                    setMessageError(error)
                    setTimeout(_ => { setWarning(false) }, 2000)

                    return
                }

                await axios.get('/api/rooms/get')
                    .then(resp => {
                        const rooms = resp.data
                        setRoom(rooms[0])
                        setRooms(rooms)
                    })
            })

        setShowDropdown2(false)
    }

    return (
        <>
            <Container onClick={_ => resetState()}>
                <Header borderBottom>
                    <Header.Picture src={room?.image} />
                    <Header.Info>
                        <RoomName>{room?.name}</RoomName>
                        <LastMessage>
                            {messages[messages.length - 1]?.room_id === room._id ?
                                messages[messages.length - 1]?.message
                                :
                                null
                            }
                        </LastMessage>
                    </Header.Info>
                    <Header.Right>
                        <IconButton onClick={_ => setSearchContainer(true)}>
                            <SearchOutlined />
                        </IconButton>
                        <IconButton onClick={_ => setShowDropdown2(!showDropdown2)}>
                            <MoreVert />
                        </IconButton>
                    </Header.Right>

                    <Dropdown showDropdown={showDropdown2}>
                        <Dropdown.Item onClick={_ => deleteRoom()}>Delete room</Dropdown.Item>
                    </Dropdown>

                </Header>

                <Content>
                    {warning ? <Warning>{messageError}</Warning> : null}

                    {messages.map(message => {
                        return (
                            message.room_id === room._id ?
                                message.username === user.username ?
                                    <MessageReciver key={`${message.username}-${message.timestamp}`}>
                                        {message.message}
                                        <TimeStamp>{message.timestamp}</TimeStamp>
                                    </MessageReciver>
                                    :
                                    <Message key={`${message.username}-${message.timestamp}`}>
                                        <User>{message.username}</User>
                                        {message.message}
                                        <TimeStamp>{message.timestamp}</TimeStamp>
                                    </Message>
                                :
                                null
                        )
                    })}
                </Content>

                <FormContainer>
                    <InsertEmotionIcon />
                    <Form>
                        <Input placeholder="Type a message" value={inputMessage} onChange={e => setInputMessage(e.target.value)} />
                        <Button onClick={sendMessage} type="submit">Send a message</Button>
                    </Form>
                    <MicIcon />
                </FormContainer>
            </Container>
            {searchContainer ?
                <Dropside position="none">
                    <Dropside.TitleContainer2>
                        <Dropside.Title2>
                            <CloseIcon onClick={_ => setSearchContainer(false)} />
                        Search messages
                        </Dropside.Title2>
                    </Dropside.TitleContainer2>
                    <Dropside.Form bb>
                        <Dropside.Search>
                            <SearchOutlined />
                            <Dropside.SearchInput value={search} onChange={e => setSearch(e.target.value)} placeholder="Search..." />
                        </Dropside.Search>
                    </Dropside.Form>
                    <Dropside.MessagesContainer>
                        {searchResults?.map(message => {
                            return (
                                message.username === user.username ?
                                    <MessageReciver key={`${message.username}-${message.timestamp}`}>
                                        {message.message}
                                        <TimeStamp>{message.timestamp}</TimeStamp>
                                    </MessageReciver>
                                    :
                                    <Message key={`${message.username}-${message.timestamp}`}>
                                        <User>{message.username}</User>
                                        {message.message}
                                        <TimeStamp>{message.timestamp}</TimeStamp>
                                    </Message>
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

export default Chat;
