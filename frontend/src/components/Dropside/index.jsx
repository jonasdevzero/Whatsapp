import React from 'react';

import {
    Container,
    Form,
    Label,
    Input,
    Submit,
    TitleContainer,
    Title,
    TitleContainer2,
    Title2,
    PictureContainer,
    Picture,
    Search,
    SearchInput,
} from './styles';

function Dropside({ children, ...props }) {
    return <Container {...props}>{children}</Container>
};

Dropside.Form = function DropsideForm({ children, ...props }) {
    return <Form {...props}>{children}</Form>
};

Dropside.Label = function DropsideLabel({ children, ...props }) {
    return <Label {...props}>{children}</Label>
}

Dropside.Input = function DropsideInput({ children, ...props }) {
    return <Input {...props}>{children}</Input>
};

Dropside.Submit = function DropsideSubmit({ children, ...props }) {
    return <Submit {...props}>{children}</Submit>
};

Dropside.TitleContainer = function DropsideTitleContainer({ children, ...props }) {
    return <TitleContainer {...props}>{children}</TitleContainer>
};

Dropside.Title = function DropsideTitle({ children, ...props }) {
    return <Title {...props}>{children}</Title>
};

Dropside.TitleContainer2 = function DropsideTitleContainer2({ children, ...props }) {
    return <TitleContainer2 {...props}>{children}</TitleContainer2>
};

Dropside.Title2 = function DropsideTitle2({ children, ...props }) {
    return <Title2 {...props}>{children}</Title2>
};

Dropside.PictureContainer = function DropsidePictureContainer({ children, ...props }) {
    return <PictureContainer {...props}>{children}</PictureContainer>
};

Dropside.Picture = function DropsidePicture({ children, ...props }) {
    return <Picture {...props}>{children}</Picture>
};

Dropside.Search = function DropsideSearch({ children, ...props }) {
    return <Search {...props}>{children}</Search>
}

Dropside.SearchInput = function DropsideSearchInput({ children, ...props }) {
    return <SearchInput {...props}>{children}</SearchInput>
}


export default Dropside;
