import React, { useState, useEffect } from 'react'

import './App.css';
import useChat from './_useChat'
import ChatBox from './ChatBox'
import Messages from './Messages'
import Settings from './Settings'

const Chat = () => {
  const [nickname, setNickname] = useState('Anonymous')
  const { messages, sendMessage, users } = useChat() // pull state and function to emit from useChat hook

  useEffect(() => {
    if (localStorage.getItem('nickname')) {
      const nick = localStorage.getItem('nickname') || ''
      setNickname(nick)
    }
  }, [])


  useEffect(() => {
    if (nickname) {
      localStorage.setItem('nickname', nickname)
    }
  })

  return (
    <div className="App">


      <Settings setNickname={setNickname} />
      <Messages messages={messages} users={users} />
      <ChatBox
        nickname={nickname}
        onSendMessage={message => {
          sendMessage(
            {
              message,
              date: new Date(Date.now()).toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', second: 'numeric', hour12: true }),
              nickname
            }
          )
        }} />
    </div>
  )
}

export default Chat;
