import React from 'react';

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
} from './styles';
import { AttachFile, MoreVert, SearchOutlined } from '@material-ui/icons'

function Chat() {
    const getTime = _ => {
        const hour = new Date().getHours()
        let minutes = new Date().getMinutes()
        minutes = minutes > 0 && minutes < 10 ? `0${minutes}` : minutes
        const timer = hour >= 12 && hour < 24 ? 'PM' : 'AM'

        return `${hour}:${minutes} ${timer}`
    }

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
                <Message>
                    <User>Jonas</User>
                    Hi devs!
                    <TimeStamp>{getTime()}</TimeStamp>
                </Message>
                <MessageReciver>
                    <User>Z</User>
                        Hi devs!
                    <TimeStamp>{getTime()}</TimeStamp>
                </MessageReciver>
            </Content>
        </Container>
    );
}

export default Chat;
