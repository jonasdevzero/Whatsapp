import React from 'react';

import {
    Container,
    Right,
    Info,
    Picture,
    Dropdown,
    Profile,
    Signout
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

Header.Profile = function HeaderProfile({ children, ...props }) {
    return <Profile {...props}>{children}</Profile>;
};

Header.Dropdown = function HeaderDropdow({ children, ...props }) {
    return <Dropdown {...props}>{children}</Dropdown>;
};

Header.Signout = function HeaderSignout({ children, ...props }) {
    return <Signout {...props}>{children}</Signout>;
};

export default Header;
