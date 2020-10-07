import React from 'react';

import { Container, Item } from './styles';

function Dropdown({ children, ...props }) {
    return <Container {...props}>{children}</Container>;
};

Dropdown.Item = function DropdownItem({ children, ...props }) {
    return <Item {...props}>{children}</Item>;
}

export default Dropdown;
