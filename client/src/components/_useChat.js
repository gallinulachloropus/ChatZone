import { useEffect, useState, useRef } from 'react'
import socketIOClient from "socket.io-client"

const useChat = () => {
    const [messages, setMessages] = useState([]) //array of messages
    const [users, setUsers] = useState()
    const socketRef = useRef()

    useEffect(() => {
        const HOST = process.env.HOST || 'localhost'
        const PORT = process.env.PORT || '5000'
        socketRef.current = socketIOClient(`${HOST}:${PORT}`) // reference to socketiocliet

        socketRef.current.on('newMessage', fullMessage => {
            setMessages(messages => {
                return [...messages, fullMessage]
            })
        })

        socketRef.current.on('users', num => {
            setUsers(num)
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
    return { messages, sendMessage, users }
}

export default useChat