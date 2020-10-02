import React, { useEffect, useState } from 'react';
import Pusher from 'pusher-js';
import axios from './contants/axios';

import { Sidebar, Chat } from './components';

function App() {
  const [messages, setMessages] = useState([]);

  useEffect(_ => {
    axios.get('/messages/sync')
      .then(resp => {
        setMessages(resp.data);
      });
  }, []);

  useEffect(_ => {
    const pusher = new Pusher('405beddf008e5ab04f57', {
      cluster: 'eu'
    }, []);

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
    <div className="app">
      <Sidebar />
      <Chat messages={messages} />
    </div>

  );
};

export default App;
