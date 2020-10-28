import React from 'react';

import {
    FormContainer,
    Container,
    Inner,
    Title,
    InputWrapper,
    Input,
    Submit,
    Description,
    Link,
    Error,

    MessageContainer,
    Message,
    MessageInput,
    MessageButton,
    SearchContainer,
    Search,
    SearchInput,
    Label,
    DropsideInput,
    DropsideSubmit
} from './styles';

function Form({ children, ...props }) {
    return <FormContainer {...props}>{children}</FormContainer>
};

Form.Inner = function FormInner({ children, ...props }) {
    return <Inner {...props}>{children}</Inner>
};

Form.Title = function FormTitle({ children, ...props }) {
    return <Title {...props}>
        {children}
    </Title>
};

Form.Container = function FormContainer({ children, ...props }) {
    return <Container {...props}>{children}</Container>
};

Form.InputWrapper = function FormInputWrapper({ children, ...props }) {
    return <InputWrapper {...props}>{children}</InputWrapper>
}

Form.Input = function FormInput({ ...props }) {
    return <Input {...props} />
};

Form.Submit = function FormSubmit({ children, ...props }) {
    return <Submit {...props}>{children}</Submit>
};

Form.Description = function FormDescription({ children, ...porps }) {
    return <Description {...porps}>{children}</Description>
};

Form.Link = function FormLink({ children, ...props }) {
    return <Link {...props}>{children}</Link>
};

Form.Error = function FormError({ children, ...props }) {
    return <Error {...props}>{children}</Error>
};

// Componnents for chat container
Form.MessageContainer = function FormMessageContainer({ children, ...props }) {
    return <MessageContainer {...props}>{children}</MessageContainer>
};

Form.Message = function FormMessage({ children, ...props }) {
    return <Message {...props}>{children}</Message>
};

Form.MessageInput = function FormMessageInput({ children, ...props }) {
    return <MessageInput {...props}>{children}</MessageInput>
};

Form.MessageButton = function FormMessageButton({ children, ...props }) {
    return <MessageButton {...props}>{children}</MessageButton>
};


Form.SearchContainer = function FormSearchContainer({ children, ...props }) {
    return <SearchContainer {...props}>{children}</SearchContainer>
};
Form.Search = function FormSearch({ children, ...props }) {
    return <Search {...props}>{children}</Search>
};
Form.SearchInput = function FormSearchInput({ children, ...props }) {
    return <SearchInput {...props}>{children}</SearchInput>
};


Form.Label = function FormLabel({ children, ...props }) {
    return <Label {...props}>{children}</Label>
}

Form.DropsideInput = function FormDropsideInput({ children, ...props }) {
    return <DropsideInput {...props}>{children}</DropsideInput>
}

Form.DropsideSubmit = function FormDropsideSubmit({ children, ...props }) {
    return <DropsideSubmit {...props}>{children}</DropsideSubmit>
}

export default Form;
