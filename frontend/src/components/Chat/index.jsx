import React, { useState, useEffect, useContext } from 'react';
import axios from '../../constants/axios';
import Fuse from 'fuse.js';

import { UserContext } from '../../context/userContext';
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
            <Container onClick={_ => hideDropdown()}>
                <Header borderBottom>
                    <Header.Picture src={currentRoom?.image} />
                    <Header.Info>
                        <RoomName>{currentRoom?.name}</RoomName>
                        <LastMessage>
                            {messages[messages.length - 1]?.room_id === currentRoom._id ?
                                messages[messages.length - 1]?.message : null
                            }
                        </LastMessage>
                    </Header.Info>
                    <Header.Right>
                        <IconButton onClick={_ => setSearchContainer(true)}>
                            <SearchOutlined />
                        </IconButton>
                        <IconButton onClick={_ => setChatDropdown(!chatDropdown)}>
                            <MoreVert />
                        </IconButton>
                    </Header.Right>

                    <Dropdown showDropdown={chatDropdown}>
                        <Dropdown.Item onClick={_ => deleteRoom()}>Delete room</Dropdown.Item>
                    </Dropdown>

                </Header>

                <Content>
                    {warning ? <Warning>{warning}</Warning> : null}

                    {messages.map(message => {
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
                </Content>

                <FormContainer>
                    <InsertEmotionIcon />
                    <Form>
                        <Input placeholder="Type a message" value={newMessage} onChange={e => setNewMessage(e.target.value)} />
                        <Button onClick={sendMessage} type="submit">Send a message</Button>
                    </Form>
                    <MicIcon />
                </FormContainer>

            </Container>

            {searchContainer ?
                <Dropside position="none" onClick={_ => hideDropdown()}>

                    <Dropside.TitleContainer2>

                        <Dropside.Title2>
                            <CloseIcon onClick={_ => setSearchContainer(false)} />
                            Search messages
                        </Dropside.Title2>

                    </Dropside.TitleContainer2>

                    <Dropside.Form bb>
                        <Dropside.Search>
                            <SearchOutlined />
                            <Dropside.SearchInput 
                                value={searchMessage} 
                                onChange={e => setSearchMessage(e.target.value)} 
                                placeholder="Search..." 
                            />
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
