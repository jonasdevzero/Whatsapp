import styled from 'styled-components/macro';

export const Container = styled.div`
    display: flex;
    justify-content: space-between;
    padding: 20px;
    border-right: ${({ borderBottom }) => borderBottom ? 'none' : '1px solid lightgray'};
    border-bottom: ${({ borderBottom }) => borderBottom && '1px solid lightgray'};
`;

export const Right = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    min-width: 10vw;

    .MuiSvgIcon-root {
        font-size: 24px !important;
    };

    .MuiIconButton-root {
        margin-right: 2vw;
    };
`;

export const Info = styled.div`
    flex: 1;
    padding-left: 20px;
`;