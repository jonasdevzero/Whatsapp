import React from 'react';

import { 
    Container,
    Form,
    Label,
    Input,
    Submit,
    TitleContainer,
    Title,
    PictureContainer,
    Picture 
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

Dropside.PictureContainer = function DropsidePictureContainer({ children, ...props }) {
    return <PictureContainer {...props}>{children}</PictureContainer>
};

Dropside.Picture = function DropsidePicture({ children, ...props }) {
    return <Picture {...props}>{children}</Picture>
};


export default Dropside;
