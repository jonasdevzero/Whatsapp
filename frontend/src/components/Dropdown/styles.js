import styled from 'styled-components/macro';

export const Container = styled.div`
    display: ${({ showDropdown }) => showDropdown ? 'flex' : 'none'};
    flex-direction: column;
    padding: 20px;
    position: absolute;
    right: 60px;
    top: 60px;
    background-color: #fff;
`