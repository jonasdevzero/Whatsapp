import React, { useEffect, useState } from 'react'
import Pusher from 'pusher-js';
import axios from '../contants/axios';

import { Sidebar, Chat as ChatComponent } from '../components'

function Chat() {
    const [messages, setMessages] = useState([]);

    useEffect(_ => {
      axios.get('/api/messages/get')
        .then(resp => {
          setMessages(resp.data.messages);
        });
    }, []);
  
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
            <Sidebar />
            <ChatComponent messages={messages} />
        </>
    )
}

export default Chat
