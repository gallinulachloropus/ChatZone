import React from 'react'

const Messages = ({ messages, users }) => {
    const displayMessages = messages.map((item, index) => <li key={index}>{item.date} - {item.nickname}:  {item.message}</li>)

    return (
        <div>
            <h2>Chat</h2>
            <h3>{users} user(s) online</h3>
            <ul>
                <li><em>Welcome to the chat.</em></li>
                {displayMessages}
            </ul>
        </div>
    )
}

export default Messages
