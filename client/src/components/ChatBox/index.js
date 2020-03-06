import React, { useState } from 'react'

const ChatBox = ({ onSendMessage }) => {
    const [message, setMessage] = useState('')
    return <textarea
        rows="2"
        placeholder="Enter a message..."
        value={message}
        onChange={e => setMessage(e.target.value)}
        //set enter behavior
        onKeyDown={e => {
            if (e.key === 'Enter') {
                e.preventDefault()
                onSendMessage(message)
                setMessage('')
            }
        }}
    >
    </textarea>
}

export default ChatBox
