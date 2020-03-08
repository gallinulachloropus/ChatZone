import { useEffect, useState, useRef } from 'react'
import socketIOClient from "socket.io-client"

const useChat = () => {
    const [storedMessages, setStoredMessages] = useState([])
    const [messages, setMessages] = useState([]) //array of messages
    const [users, setUsers] = useState()
    const ioRef = useRef()

    useEffect(() => {
        const title = document.title
        //const DEV = window.location.hostname + ':5000'
        const HOST = window.location.hostname
        console.log(`Connected to ${HOST}`)
        ioRef.current = socketIOClient(HOST) // reference to socketiocliet

        ioRef.current.on('prevMsg', messages => {
            if (Array.isArray(messages)) {
                setStoredMessages(messages)
            }
        })

        ioRef.current.on('users', num => {
            setUsers(num)
        })

        ioRef.current.on('newMessage', fullMessage => {
            document.title = `New Message ! | ${title}`
            setTimeout(() => { document.title = title }, 3000)
            setMessages(messages => {
                return [...messages, fullMessage]
            })
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
    return { messages, sendMessage, users, storedMessages }
}

export default useChat