import React from 'react';

import {
    Container,
    Right,
    Info,
} from './styles';
import { Avatar, IconButton } from '@material-ui/core';


function Header({ children, ...props }) {
    return (
        <Container {...props}>{children}</Container>
    );
};

Header.Avatar = function HeaderAvatar({ src }) {
    return <Avatar src={src} />
};

Header.Right = function HeaderRight({ children, ...props }) {
    return (
        <Right {...props}>
            {children?.map((item, i) => <IconButton key={`HeaderRight-Item-${i}`}>{item}</IconButton>)}
        </Right>
    )
};

Header.Info = function HeaderInfo({ children, ...props }) {
    return <Info {...props}>{children}</Info>
};

export default Header;
