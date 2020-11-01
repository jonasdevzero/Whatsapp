import styled from 'styled-components/macro';

export const Container = styled.div`
    display: flex;
    flex-direction: column;
    flex: .7;
    position: relative;
`;

export const Content = styled.div`
    flex: 1;

    ::-webkit-scrollbar {
        width: 0px;
    }
`;

export const Message = styled.p`
    position: relative;
    font-size: 16px;
    padding: 25px 10px 10px 10px;
    width: fit-content;
    border-radius: 10px;
    background-color: #fff;
    margin: 20px 0px 25px 35px; 
`;

export const MessageSender = styled(Message)`
    background-color: #dcf8c6;
    margin: 23px 35px 25px 0px; 
    margin-left: auto;
    padding: 10px;
`

export const Username = styled.span`
    position: absolute;
    top: 6px;
    left: 10px;
    font-weight: 700;
    font-size: 13px;
`;

export const TimeStamp = styled.span`
    font-size: 12px;
    margin-left: 20px;
`

export const Warning = styled.div`
    position: absolute;
    padding: 20px;
    font-weight: bold;
    top: 100px;
    left: 37%;
    background-color: #fff;
`