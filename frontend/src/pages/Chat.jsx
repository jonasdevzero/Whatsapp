import React, { useEffect, useState, useContext } from 'react';
import Pusher from 'pusher-js';
import axios from '../contants/axios';

import { UserContext } from '../context/userContext';

import { Sidebar, Chat as ChatComponent } from '../components';

function Chat() {
  const { user } = useContext(UserContext);
  const [messages, setMessages] = useState([]);
  const [room, setRoom] = useState('global');
  const [rooms, setRooms] = useState([]);

  useEffect(_ => {
    axios.get('/api/rooms/get')
      .then(resp => {
        setRooms(resp.data)
      })
  }, []);

  useEffect(_ => {
    axios.post('/api/messages/get', { room })
      .then(resp => {
        setMessages(resp.data.messages);
      });
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

  return (
    <>
      <Sidebar user={user} setRoom={setRoom} rooms={rooms} />
      <ChatComponent user={user} messages={messages} room={room} />
    </>
  )
}

export default Chat
