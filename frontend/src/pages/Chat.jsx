import React, { useEffect, useState } from 'react';
import Pusher from 'pusher-js';
import axios from '../constants/axios';

import * as ROUTES from '../constants/routes'

import { Sidebar, Chat as ChatComponent } from '../components';

function Chat() {
  const [messages, setMessages] = useState([]);
  const [currentRoom, setCurrentRoom] = useState({});
  const [rooms, setRooms] = useState([]);

  const [chatDropdown, setChatDropdown] = useState(false);
  const [profileDropdown, setProfileDropdown] = useState(false);

  function hideDropdown() {
    if (chatDropdown || profileDropdown) {
      setChatDropdown(false)
      setProfileDropdown(false)
    }
  }

  useEffect(_ => {
    axios.get(ROUTES.GET_ROOMS)
      .then(resp => {
        setCurrentRoom(resp.data[0])
        setRooms(resp.data)
      })
  }, []);

  useEffect(_ => {
    if (currentRoom._id) {
      axios.post(ROUTES.GET_MESSAGES, {
        room_id: currentRoom._id
      })
        .then(resp => {
          setMessages(resp.data.messages);
        });
    }
  }, [currentRoom]);

  useEffect(_ => {
    const pusher = new Pusher('405beddf008e5ab04f57', {
      cluster: 'eu'
    });
    const messageChannel = pusher.subscribe('messages');
    const roomChannel = pusher.subscribe('rooms');

    messageChannel.bind('inserted', newMessage => {
      setMessages([...messages, newMessage]);
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

    return () => {
      messageChannel.unbind_all();
      messageChannel.unsubscribe();
      roomChannel.unbind_all();
      roomChannel.unsubscribe();
    }

  }, [messages, rooms, currentRoom._id]);

  return (
    <>
      <Sidebar
        rooms={rooms}
        setRooms={setRooms}
        setCurrentRoom={setCurrentRoom}

        profileDropdown={profileDropdown}
        setProfileDropdown={setProfileDropdown}
        hideDropdown={hideDropdown}
      />
      <ChatComponent
        currentRoom={currentRoom}
        setCurrentRoom={setCurrentRoom}
        setRooms={setRooms}
        messages={messages}

        chatDropdown={chatDropdown}
        setChatDropdown={setChatDropdown}
        hideDropdown={hideDropdown}
      />
    </>
  )
}

export default Chat
