import React, { useEffect, useState } from 'react';
import Pusher from 'pusher-js';

import { getMessages } from '../../services/messages';
import { getRooms } from '../../services/rooms';

import { SidebarContainer, ChatContainer } from '../../containers';

import { ChatWrapper, LoadingContainer } from './styles';
import loadingSvg from '../../assets/loading.svg';

function Chat() {
  const [currentRoom, setCurrentRoom] = useState({});
  const [rooms, setRooms] = useState([]);
  const [messages, setMessages] = useState([]);

  const [showDrop, setShowDrop] = useState('');

  const [loading, setLoading] = useState(true);
  
  useEffect(_ => {
    getRooms().then(rooms => {
      setRooms(rooms);
      setCurrentRoom(rooms[0]);
    });
  }, []);

  useEffect(_ => {
    if (!currentRoom._id) return;

    getMessages(currentRoom._id).then(messages => {
      setMessages(messages);
      setLoading(false); 
    });
  }, [currentRoom]);

  useEffect(_ => {
    const pusher = new Pusher('405beddf008e5ab04f57', {
      cluster: 'eu'
    });
    const messageChannel = pusher.subscribe('messages');

    messageChannel.bind('inserted', newMessage => {
      if (newMessage.room_id === currentRoom._id) {
        setMessages([...messages, newMessage]);
      };
    });

    return () => {
      messageChannel.unbind_all();
      messageChannel.unsubscribe();
    }

  }, [messages, currentRoom._id]);

  useEffect(_ => {
    const pusher = new Pusher('405beddf008e5ab04f57', {
      cluster: 'eu'
    });
    const roomChannel = pusher.subscribe('rooms');

    roomChannel.bind('inserted', newRoom => {
      setRooms([...rooms, newRoom]);
    });

    roomChannel.bind('deleted', deletedRoom => {
      const currentRooms = rooms.filter(room => room._id !== deletedRoom._id ? room : null);
      setRooms(currentRooms);

      if (deletedRoom._id === currentRoom._id) {
        setCurrentRoom(rooms[0]);
      };
    });

    roomChannel.bind('updated', async updatedRoom => {
      getRooms().then(rooms => {
        setRooms(rooms);

        if (currentRoom._id === updatedRoom._id) {
          const current = rooms.filter(room => room._id === updatedRoom._id ? room : null)[0];
          setCurrentRoom(current);
        };
      });
    });

    return () => {
      roomChannel.unbind_all();
      roomChannel.unsubscribe();
    }
  }, [rooms, currentRoom._id])


  return (
    <ChatWrapper>
      {!loading ?
        <>
          <SidebarContainer
            rooms={rooms}
            setRooms={setRooms}
            setCurrentRoom={setCurrentRoom}

            showDrop={showDrop}
            setShowDrop={setShowDrop}
          />
          <ChatContainer
            currentRoom={currentRoom}
            setCurrentRoom={setCurrentRoom}
            setRooms={setRooms}
            messages={messages}

            showDrop={showDrop}
            setShowDrop={setShowDrop}
          />
        </>
        :
        <LoadingContainer>
          <img src={loadingSvg} alt="loading" />
        </LoadingContainer>
      }
    </ChatWrapper>
  )
}

export default Chat
