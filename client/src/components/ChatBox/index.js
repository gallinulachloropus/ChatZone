import React, { useState, useRef } from 'react'

const ChatBox = ({ onSendMessage, nickname, color }) => {
    const [message, setMessage] = useState('')
    const submit = () => {
        if (message) {
            if (message.length < 300) {
                onSendMessage(message)
            } else { alert('Message must be under 300 characters.') }
        }
        setMessage('')
    }
    const chat = useRef()

    return <div className="chatbox-container">
        <p className="nickname" style={{ color }}>{nickname}: </p>
        <textarea
            ref={chat}
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
