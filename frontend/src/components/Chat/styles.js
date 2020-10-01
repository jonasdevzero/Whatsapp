import styled from 'styled-components/macro';

export const Container = styled.div`
    display: flex;
    flex-direction: column;
    flex: .65;
`;

export const RoomName = styled.h3`
    margin-bottom: 3px;
    font-weight: 500;
`;

export const LastMessage = styled.p`
    color: gray;
`;

export const Content = styled.div`
    background: url('https://user-images.githubusercontent.com/15075759/28719144-86dc0f70-73b1-11e7-911d-60d70fcded21.png') repeat center;
    flex: 1;
    padding: 30px;
    overflow-y: scroll;

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
    margin-bottom: 30px;


`;

export const User = styled.span`
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

export const MessageReciver = styled(Message)`
    background-color: #dcf8c6;
    margin-left: auto;
    padding: 10px;

    ${User} {
        display: none;
    }
`