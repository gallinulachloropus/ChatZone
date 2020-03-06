import React, { useState } from 'react';

import './App.css';
import useChat from './_useChat'
import ChatBox from './ChatBox'
import Messages from './Messages'

const Chat = () => {
  const [nickname, useNickname] = useState('Anonymous')
  const { messages, sendMessage } = useChat() // pull state and function to emit from useChat hook
  return (
    <div className="App">
      <Messages messages={messages} />
      <ChatBox onSendMessage={message => {
        sendMessage(
          {
            message,
            date: new Date(Date.now()).toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', second: 'numeric', hour12: true }),
            nickname
          }
        )
      }} />
    </div>
  );
}

export default Chat;
