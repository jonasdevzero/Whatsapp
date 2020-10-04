import React from 'react';

import {
    Container,
    Inner,
    Title,
    FormGroup,
    Group,
    Input,
    Submit,
    Text,
    Link,
    Error,
    Icon
} from './styles';

function Form({ children, ...props }) {
    return <FormGroup {...props}>{children}</FormGroup>
};

Form.Inner = function FormInner({ children, ...props }) {
    return <Inner {...props}>{children}</Inner>
};

Form.Title = function FormTitle({ children, ...props }) {
    return <Title {...props}>
        {children}
        <Icon 
            src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg" 
            alt="Whatsapp"
        />
        </Title>
};

Form.Container = function FormContainer({ children, ...props }) {
    return <Container {...props}>{children}</Container>
};

Form.Group = function FormGroup({ children, ...props }) {
    return <Group {...props}>{children}</Group>
}

Form.Input = function FormInput({ ...props }) {
    return <Input {...props} />
};

Form.Submit = function FormSubmit({ children, ...props }) {
    return <Submit {...props}>{children}</Submit>
};

Form.Text = function FormText({ children, ...porps }) {
    return <Text {...porps}>{children}</Text>
};

Form.Link = function FormLink({ children, ...props }) {
    return <Link {...props}>{children}</Link>
};

Form.Error = function FormError({ children, ...props }) {
    return <Error {...props}>{children}</Error>
};

export default Form;
