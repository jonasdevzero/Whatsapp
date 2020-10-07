import React from 'react';

import {
    Container,
    TitleContainer,
    Title,
    SearchTitle,
    PictureContainer,
    Picture,
    MessagesContainer,
} from './styles';

function Dropside({ children, ...props }) {
    return <Container {...props}>{children}</Container>
};

Dropside.TitleContainer = function DropsideTitleContainer({ children, ...props }) {
    return <TitleContainer {...props}>{children}</TitleContainer>
};

Dropside.Title = function DropsideTitle({ children, ...props }) {
    return <Title {...props}>{children}</Title>
};

Dropside.SearchTitle = function DropsideSearchTitle({ children, ...props }) {
    return <SearchTitle {...props}>{children}</SearchTitle>
};

Dropside.PictureContainer = function DropsidePictureContainer({ children, ...props }) {
    return <PictureContainer {...props}>{children}</PictureContainer>
};

Dropside.Picture = function DropsidePicture({ children, ...props }) {
    return <Picture {...props}>{children}</Picture>
};

Dropside.MessagesContainer = function DropsideMessagesContainer({ children, ...props }) {
    return <MessagesContainer {...props}>{children}</MessagesContainer>
}

export default Dropside;
