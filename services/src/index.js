const express = require('express')
const http = require('http')
const cors = require('cors')

const app = express()
const serve = http.Server(app)
const PORT = process.env.PORT || '5000'

app.use(cors)

//display react app at root
app.use(express.static('../client/build'))

//Start HTTP with express
serve.listen(PORT, () => {
    console.log(`Listening on ${PORT}`)
})

//Start websocket server
const io = require('socket.io')(serve)
io.on('connection', (socket) => {
    console.log('Connection Established... ', io.engine.clientsCount)
    io.emit('users', io.engine.clientsCount)
    socket.on('newMessage', data => {
        console.log(`${data.nickname} said @ ${data.date} ${data.color}: `, data.message)
        io.emit('newMessage', data)
    })

    socket.on('disconnect', () => {
        console.log('Disconnected...')
        io.emit('users', io.engine.clientsCount)
    })
});