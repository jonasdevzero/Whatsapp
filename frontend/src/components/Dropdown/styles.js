import styled from 'styled-components/macro';

export const Container = styled.div`
    display: ${({ showDropdown }) => showDropdown ? 'flex' : 'none'};
    flex-direction: column;
    padding: 10px 0;
    position: absolute;
    right: 20px;
    top: 40px;
    background-color: #fff;
`;

export const Item = styled.button`
    text-align: start;
    width: 180px;
    height: 40px;
    border: none;
    outline: none;
    padding: 0 15px;
    background: none;
    font-size: 16px;
    cursor: pointer;
    color: ${({ color }) => color ? color : '#000'};
    
    &:hover {
        background-color: rgba(0, 0, 0, .1);
    };
`;