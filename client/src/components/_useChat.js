import { useEffect, useState, useRef } from 'react'
import socketIOClient from "socket.io-client"

const useChat = () => {
    const [messages, setMessages] = useState([]) //array of messages
    const socketRef = useRef()

    useEffect(() => {
        const HOST = process.env.HOST || '192.168.254.11'
        const PORT = process.env.PORT || '5000'
        socketRef.current = socketIOClient(`${HOST}:${PORT}`) // reference to socketiocliet

        socketRef.current.on('newMessage', (fullMessage) => {
            setMessages(messages => {
                return [...messages, fullMessage]
            })
        })

        //cleanup
        return () => {
            socketRef.current.disconnect()
        }
    }, [])

    const sendMessage = (fullMessage) => {
        //send to all connected users
        socketRef.current.emit('newMessage', fullMessage)
    }
    //return messages and sendMessage to use in chatbox
    return { messages, sendMessage }
}

export default useChat