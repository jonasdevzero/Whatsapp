import React, { useEffect, useState, useContext } from 'react';
import Pusher from 'pusher-js';
import axios from '../contants/axios';

import { UserContext } from '../context/userContext';

import { Sidebar, Chat as ChatComponent } from '../components';

function Chat() {
  const { user, setUser } = useContext(UserContext);
  const [messages, setMessages] = useState([]);
  const [room, setRoom] = useState({});
  const [rooms, setRooms] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [showDropdown2, setShowDropdown2] = useState(false);

  useEffect(_ => {
    axios.get('/api/rooms/get')
      .then(resp => {
        setRoom(resp.data[0])
        setRooms(resp.data)
      })
  }, []);

  useEffect(_ => {
    if (room._id) {
      axios.post('/api/messages/get', { room_id: room._id })
        .then(resp => {
          setMessages(resp.data.messages);
        });
    }
  }, [room]);

  useEffect(_ => {
    const pusher = new Pusher('405beddf008e5ab04f57', {
      cluster: 'eu'
    });

    const channel = pusher.subscribe('messages');
    channel.bind('inserted', data => {
      setMessages([...messages, data]);
    });

    return () => {
      channel.unbind_all();
      channel.unsubscribe();
    }
  }, [messages]);

  function resetState() {
    if (showDropdown || showDropdown2) {
      setShowDropdown(false)
      setShowDropdown2(false)
    }
  }

  return (
    <>
      <Sidebar
        user={user}
        setUser={setUser}
        setRoom={setRoom}
        rooms={rooms}
        setRooms={setRooms}
        showDropdown={showDropdown}
        setShowDropdown={setShowDropdown}
        resetState={resetState}
      />
      <ChatComponent
        user={user}
        messages={messages}
        room={room}
        setRoom={setRoom}
        setRooms={setRooms}
        showDropdown2={showDropdown2}
        setShowDropdown2={setShowDropdown2}
        resetState={resetState}
      />
    </>
  )
}

export default Chat
