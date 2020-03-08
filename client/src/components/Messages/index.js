import React, { useEffect, useRef } from 'react'

const Messages = ({ storedMessages, messages, users }) => {
    let stored = ''
    if (storedMessages) {
        stored = storedMessages.map((item, index) => {
            return <li key={index}>{item.date} - <span style={{ fontWeight: 'bold', color: item.color }}>{item.nickname}</span>:  {item.message}</li>
        })
    }
    const displayMessages = messages.map((item, index) => {
        return <li key={index}>{item.date} - <span style={{ fontWeight: 'bold', color: item.color }}>{item.nickname}</span>:  {item.message}</li>
    })
    const last = useRef()
    const scrollToBottom = () => {
        last.current.scrollIntoView({ behavior: "smooth" });
    }

    useEffect(() => {
        scrollToBottom()
    }, [messages])

    return (
        <div className="messages">
            <h1>ChatZone</h1>
            <h3>{users} user(s) online</h3>
            <ul>
                <li><em>Welcome to the chat.</em></li>
                {stored}
                {displayMessages}
                <li style={{ height: '1px', padding: 0, margin: 0 }} ref={last}></li>
            </ul>

        </div>
    )
}

export default Messages
