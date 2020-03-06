import React, { useState } from 'react'

const ChatBox = ({ onSendMessage, nickname }) => {
    const [message, setMessage] = useState('')

    //cannot be normal form due to enter behavior on textarea
    const submit = () => {
        if (message) { onSendMessage(message) }
        setMessage('')
    }

    return <div className="chatbox-container">
        <p>{nickname}: </p>
        <textarea
            rows="2"
            placeholder="Enter a message..."
            value={message}
            onChange={e => setMessage(e.target.value)}
            //set enter behavior
            onKeyDown={e => {
                if (e.key === 'Enter') {
                    e.preventDefault()
                    submit()
                }
            }}
        >
        </textarea>
        <button onClick={e => { submit() }}>Submit</button>
    </div>
}

export default ChatBox
