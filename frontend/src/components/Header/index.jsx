import React from 'react';

import {
    Container,
    Right,
    Info,
    Picture,
    RoomName,
    LastMessage,
} from './styles';

function Header({ children, ...props }) {
    return <Container {...props}>{children}</Container>;
};

Header.Picture = function HeaderPicture({ src }) {
    return <Picture src={src} />;
};

Header.Right = function HeaderRight({ children, ...props }) {
    return <Right {...props}>{children}</Right>;

};

Header.Info = function HeaderInfo({ children, ...props }) {
    return <Info {...props}>{children}</Info>;
};

Header.RoomName = function HeaderRoomName({ children, ...props }) {
    return <RoomName {...props}>{children}</RoomName>
}

Header.LastMessage = function HeaderLastMessage({ children, ...props }) {
    return <LastMessage {...props}>{children}</LastMessage>
}

export default Header;
