import React from 'react'

const Messages = ({ messages }) => {
    const displayMessages = messages.map((item, index) => <li key={index}>{item.date} - {item.nickname}:  {item.message}</li>)

    return (
        <div>
            <h2>Bug Chat</h2>
            <ul>
                {displayMessages}
            </ul>
        </div>
    )
}

export default Messages
