import express from 'express'
import * as http from "http"
import {Server} from "socket.io"
import mongoose from "mongoose"
import bodyParser from "body-parser"
import cookieParser from "cookie-parser"
import cors from 'cors'
import fileUpload from 'express-fileupload'
import 'dotenv/config'

import authRoutes from "./routes/authRoutes.js";
import postRoutes from "./routes/postRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import groupRoutes from "./routes/groupRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";

const app = express()

app.use(express.json())
app.use(cors({
    credentials: true,
    origin: process.env.CLIENT_URL
}))
app.use(fileUpload())
app.use(cookieParser())
app.use(bodyParser.json())

app.use('/api', authRoutes, postRoutes, userRoutes, groupRoutes, adminRoutes)

const server = http.createServer(app)
const io = new Server(server, {
    cors: {
        origin: process.env.CLIENT_URL,
        methods: ["GET", "POST"]
    }
})

io.on('connection', (socket) => {
    console.log(`User ${socket.id} connected`)

    socket.on('joinRoom', roomId => {
        socket.join(roomId)
        console.log(`User ${socket.id} joined room ${roomId}`)
    })

    socket.on('sendMessage', data => {
        const [msg, id] = data
        socket.broadcast.to(id).emit('receiveMessage', msg)
    })

    socket.on('sendLocation', data => {
        const [msg, id] = data
        socket.broadcast.to(id).emit('locationMessage', msg)
    })

    socket.on('leaveRoom', roomId => {
        socket.leave(roomId)
        console.log(`User ${socket.id} left room ${roomId}`)
    })

    socket.on('disconnect', () => {
        console.log(`User ${socket.id} disconnected`)
    })
})

const start = async () => {
    await mongoose.connect(process.env.MONGO_URL,
        {useNewUrlParser: true, useUnifiedTopology: true})
        .then(() => console.log(`Connected to DB`))
        .then(() => server.listen(process.env.PORT, () => console.log(`Server started on port ${process.env.PORT}`)))
        .catch(e => console.log(e))
}

start()