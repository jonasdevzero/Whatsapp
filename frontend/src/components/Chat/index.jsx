import React, { useState } from 'react';
import axios from '../../contants/axios';

import { Header, Dropdown } from '../'

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
    Warning
} from './styles';
import { IconButton } from '@material-ui/core';
import { MoreVert, SearchOutlined } from '@material-ui/icons';
import InsertEmotionIcon from '@material-ui/icons/InsertEmoticon';
import MicIcon from '@material-ui/icons/Mic';

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
    const [warning, setWarning] = useState(false)

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
        if (room.name === 'global' || room.name === 'React Community') {
            setShowDropdown2(false)
            setWarning(true)
            setTimeout(_ => {
                setWarning(false)
            }, 2500)
            return
        }

        await axios.post('/api/rooms/delete', room)
        await axios.get('/api/rooms/get')
            .then(resp => {
                setRoom(resp.data[0])
                setRooms(resp.data)
            })
        setShowDropdown2(false)
    }

    return (
        <Container onClick={_ => resetState()}>
            <Header borderBottom>
                <Header.Picture src={room?.image} />
                <Header.Info>
                    <RoomName>{room?.name}</RoomName>
                    <LastMessage>{messages[messages.length - 1]?.message}</LastMessage>
                </Header.Info>
                <Header.Right>
                    <IconButton>
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
                {warning ? <Warning>Is not possible to delete this room</Warning> : null}

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
                    <Input placeholder="Type a message" value={inputMessage} onChange={e => setInputMessage(e.target.value)} />
                    <Button onClick={sendMessage} type="submit">Send a message</Button>
                </Form>
                <MicIcon />
            </FormContainer>
        </Container>
    );
}

export default Chat;
