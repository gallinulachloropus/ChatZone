import { useEffect, useState, useRef } from 'react'
import socketIOClient from "socket.io-client"

const useChat = () => {
    const [messages, setMessages] = useState([]) //array of messages
    const [users, setUsers] = useState()
    const ioRef = useRef()

    useEffect(() => {
        const HOST =  window.location.hostname
        console.log(`Connected to ${HOST}`)
        ioRef.current = socketIOClient(HOST) // reference to socketiocliet

        ioRef.current.on('newMessage', fullMessage => {
            setMessages(messages => {
                return [...messages, fullMessage]
            })
        })

        ioRef.current.on('users', num => {
            setUsers(num)
        })


        //cleanup
        return () => {
            ioRef.current.disconnect()
        }
    }, [])

    const sendMessage = (fullMessage) => {
        //send to all connected users
        ioRef.current.emit('newMessage', fullMessage)
    }
    //return messages and sendMessage to use in chatbox
    return { messages, sendMessage, users }
}

export default useChat