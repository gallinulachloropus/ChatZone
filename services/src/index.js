const express = require('express')
const http = require('http')

const app = express()
const serve = http.Server(app)
const PORT = process.env.PORT || '5000'

//display react app at root
app.use(express.static('../client/build'))

//Start HTTP with express
serve.listen(PORT, () => {
    console.log(`Listening on ${PORT}`)
})

//Start websocket server
const io = require('socket.io')(serve)
//object containing stored messages
const storedMessages = {
    messages: [],
    trim() {
        if (this.messages.length > 5) {
            this.messages.shift()
        }
    },
    store(data) {
        this.messages = [...this.messages, data]
        this.trim()
    }
}

io.on('connection', (socket) => {
    console.log('Connection Established... ', io.engine.clientsCount)
    io.emit('users', io.engine.clientsCount)
    socket.emit('prevMsg', storedMessages.messages)
    socket.on('id', data => {
        console.log(data)
    })
    socket.on('newMessage', data => {
        console.log(`${data.nickname} said @ ${data.date} ${data.color}: `, data.message)
        storedMessages.store(data)
        console.log(storedMessages.messages)
        io.emit('newMessage', data)
    })

    socket.on('disconnect', () => {
        console.log('Disconnected...')
        io.emit('users', io.engine.clientsCount)
    })
});