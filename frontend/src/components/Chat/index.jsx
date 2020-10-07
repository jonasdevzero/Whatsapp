import React from 'react'

import {
    Container,
    Content,
    Message,
    MessageSender,
    Username,
    TimeStamp,
    Warning,
} from './styles';

function Chat({ children, ...props }) {
    return <Content {...props}>{children}</Content>;
};

Chat.Container = function ChatContainer({ children, ...props }) {
    return <Container {...props}>{children}</Container>;
};

Chat.Message = function ChatMessage({ children, ...props }) {
    return <Message {...props}>{children}</Message>;
};

Chat.MessageSender = function ChatMessageSender({ children, ...props }) {
    return <MessageSender {...props}>{children}</MessageSender>;
};

Chat.Username = function ChatUsername({ children, ...props }) {
    return <Username {...props}>{children}</Username>;
};

Chat.TimeStamp = function ChatTimeStamp({ children, ...props }) {
    return <TimeStamp {...props}>{children}</TimeStamp>;
};

Chat.Warning = function ChatWarning({ children, ...props }) {
    return <Warning {...props}>{children}</Warning>;
};

export default Chat;
