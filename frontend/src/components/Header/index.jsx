import React from 'react';

import {
    Container,
    Right,
    Info,
    Picture,
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

export default Header;
