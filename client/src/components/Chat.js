import React, { useState, useEffect } from 'react'

import './App.css';
import useChat from './_useChat'
import ChatBox from './ChatBox'
import Messages from './Messages'
import Settings from './Settings'

const Chat = () => {
  const [nickname, setNickname] = useState('Anonymous')
  const [color, setColor] = useState('Black')
  const { messages, sendMessage, users, storedMessages } = useChat() // pull state and function to emit from useChat hook

  useEffect(() => {
    if (localStorage.getItem('nickname')) {
      const n = localStorage.getItem('nickname') || ''
      const c = localStorage.getItem('color') || ''
      setColor(c)
      setNickname(n)
    }
  }, [])

  useEffect(() => {
    if (nickname) {
      localStorage.setItem('nickname', nickname)
    }
    if (color) {
      localStorage.setItem('color', color)
    }
  })

  return (
    <div className="App">
      <Settings setNickname={setNickname} color={color} setColor={setColor} />
      <Messages storedMessages={storedMessages} messages={messages} users={users} />
      <ChatBox
        nickname={nickname}
        color={color}
        onSendMessage={message => {
          sendMessage(
            {
              message,
              date: new Date(Date.now()).toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', second: 'numeric', hour12: true }),
              nickname,
              color
            }
          )
        }} />
    </div>
  )
}

export default Chat;
