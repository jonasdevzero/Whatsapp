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

function Chat({ messages }) {
    const [inputMessage, setInputMessage] = useState('');

    const getTime = _ => {
        const hour = new Date().getHours()
        let minutes = new Date().getMinutes()
        minutes = minutes > 0 && minutes < 10 ? `0${minutes}` : minutes
        const timer = hour >= 12 && hour < 24 ? 'PM' : 'AM'

        return `${hour}:${minutes} ${timer}`
    }

    const sendMessage = async e => {
        e.preventDefault();

        await axios.post('/api/messages/new', {
            message: inputMessage,
            name: "Demo app",
            timestamp: getTime(),
            received: false
        });

        setInputMessage('')
    };

    return (
        <Container>
            <Header borderBottom>
                <Header.Avatar />
                <Header.Info>
                    <RoomName>Room Name</RoomName>
                    <LastMessage>Last seen at...</LastMessage>
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
                        message.received ?
                        <MessageReciver>
                            <User>{message.name}</User>
                            {message.message}
                            <TimeStamp>{message.timestamp}</TimeStamp>
                        </MessageReciver>
                        :
                        <Message>
                            <User>{message.name}</User>
                            {message.message}
                            <TimeStamp>{message.timestamp}</TimeStamp>
                        </Message>
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
