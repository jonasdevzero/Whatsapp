import React from 'react';

import { Container } from './styles';

function Dropdown({ children, ...props }) {
    return <Container {...props}>{children}</Container>;
};

export default Dropdown;
