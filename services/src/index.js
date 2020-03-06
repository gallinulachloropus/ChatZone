
const express = require('express')
const http = require('http')

const app = express()
const serve = http.Server(app)
const PORT = process.env.PORT || 5000

//display react app at root
app.use(express.static('../client/build'))

//Start HTTP with express
serve.listen(PORT, () => {
    console.log(`Listening on ${PORT}`)
})

//Start websocket server
const io = require('socket.io')(serve)
io.on('connection', (socket) => {
    console.log('Connection Established...')

    socket.on("newMessage", data => {
        console.log(`${data.nickname} said @ ${data.date}: `, data.message)
        io.emit("newMessage", data)
    })

    socket.on('disconnect', () => {
        console.log("Disconnected...")
    });
});