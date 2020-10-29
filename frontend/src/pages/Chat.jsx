import React, { useEffect, useState } from 'react';
import Pusher from 'pusher-js';

import { getMessages } from '../services/messages';
import { getRooms } from '../services/rooms';

import { SidebarContainer, ChatContainer } from '../containers';

// Define a unique state the values of dropside and dropdown with switch/case
function Chat() {
  const [currentRoom, setCurrentRoom] = useState({});
  const [rooms, setRooms] = useState([]);
  const [messages, setMessages] = useState([]);

  const [chatDropdown, setChatDropdown] = useState(false);
  const [profileDropdown, setProfileDropdown] = useState(false);

  useEffect(_ => {
    getRooms().then(rooms => {
      setRooms(rooms);
      setCurrentRoom(rooms[0]);
    });
  }, []);

  useEffect(_ => {
    if (!currentRoom._id) return;
    getMessages(currentRoom._id).then(messages => setMessages(messages));
  }, [currentRoom]);

  useEffect(_ => {
    const pusher = new Pusher('405beddf008e5ab04f57', {
      cluster: 'eu'
    });
    const messageChannel = pusher.subscribe('messages');
    const roomChannel = pusher.subscribe('rooms');

    messageChannel.bind('inserted', newMessage => {
      if (newMessage.room_id === currentRoom._id) {
        setMessages([...messages, newMessage]);
      };
    });

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

        if (currentRoom._id === updatedRoom._id) { // ?
          setCurrentRoom(currentRoom)
        };
      });
    });

    return () => {
      messageChannel.unbind_all();
      messageChannel.unsubscribe();

      roomChannel.unbind_all();
      roomChannel.unsubscribe();
    }

  }, [messages, rooms, currentRoom]);

  function hiddenDropdown() {
    if (chatDropdown || profileDropdown) {
      setChatDropdown(false);
      setProfileDropdown(false);
    };
  };

  return (
    <>
      <SidebarContainer
        rooms={rooms}
        setRooms={setRooms}
        setCurrentRoom={setCurrentRoom}

        profileDropdown={profileDropdown}
        setProfileDropdown={setProfileDropdown}
        hiddenDropdown={hiddenDropdown}
      />
      <ChatContainer
        currentRoom={currentRoom}
        setCurrentRoom={setCurrentRoom}
        setRooms={setRooms}
        messages={messages}

        chatDropdown={chatDropdown}
        setChatDropdown={setChatDropdown}
        hiddenDropdown={hiddenDropdown}
      />
    </>
  )
}

export default Chat
