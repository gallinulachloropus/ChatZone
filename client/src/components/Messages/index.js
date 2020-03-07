import React, { useEffect, useRef } from 'react'

const Messages = ({ messages, users }) => {
    const displayMessages = messages.map((item, index) => <li key={index}>{item.date} - <span style={{ fontWeight: 'bold', color: item.color }}>{item.nickname}</span>:  {item.message}</li>)
    const last = useRef()
    const scrollToBottom = () => {
        last.current.scrollIntoView({ behavior: "smooth" });
    }

    useEffect(() => {
        scrollToBottom()
    })

    return (
        <div className="messages">
            <h2>ChatZone</h2>
            <h3>{users} user(s) online</h3>
            <ul>
                <li><em>Welcome to the chat.</em></li>
                {displayMessages}
                <li style={{ height: '1px', padding: 0, margin: 0 }} ref={last}></li>
            </ul>

        </div>
    )
}

export default Messages
