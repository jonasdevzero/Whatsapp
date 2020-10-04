import React, { useState } from 'react';
import axios from '../../contants/axios';

import Header from '../Header';

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
} from './styles';
import { AttachFile, MoreVert, SearchOutlined } from '@material-ui/icons';
import InsertEmotionIcon from '@material-ui/icons/InsertEmoticon';
import MicIcon from '@material-ui/icons/Mic';

function Chat({ messages, user, room }) {
    const [inputMessage, setInputMessage] = useState('');

    const sendMessage = async e => {
        e.preventDefault();

        await axios.post('/api/messages/send', {
            message: inputMessage,
            username: user.username,
            room: room,
        });

        setInputMessage('')
    };

    return (
        <Container>
            <Header borderBottom>
                <Header.Avatar />
                <Header.Info>
                    <RoomName>{room}</RoomName>
                    <LastMessage>{messages[messages.length - 1]?.message}</LastMessage>
                </Header.Info>
                <Header.Right>
                    <SearchOutlined />
                    <AttachFile />
                    <MoreVert />
                </Header.Right>
            </Header>
            <Content>
                {messages.map(message => {
                    return (
                        message.room === room ?
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
                    <Input value={inputMessage} onChange={e => setInputMessage(e.target.value)} />
                    <Button onClick={sendMessage} type="submit">Send a message</Button>
                </Form>
                <MicIcon />
            </FormContainer>
        </Container>
    );
}

export default Chat;
