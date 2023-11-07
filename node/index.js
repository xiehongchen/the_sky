import { Server } from 'socket.io'

const io = new Server(6060, { cors: { origin: '*' } })

io.on('connection', (socket) => {
  console.log(`Socket ${socket.id} connected`)
  // 新客户端连接时，广播
  io.emit('chat', `有人进入聊天室，当前聊天室人数：${io.engine.clientsCount}`)

  // 创建房间
  socket.on('createRoom', (roomName) => {
    console.log(`Socket ${socket.id} created and joined room ${roomName}`)
    socket.join(roomName)
  })

  // 加入房间
  socket.on('joinRoom', (roomName) => {
    console.log(`Socket ${socket.id} joined room ${roomName}`)
    socket.join(roomName)
  })

  // 监听客户端发送的消息
  socket.on('message', (data) => {
    console.log(`Received message from ${socket.id}: ${data}`)
    console.log('data', data)

    // 广播消息到同一房间的所有客户端
    io.to(data.room).emit('message', data.message)
  })
  // 广播任何客户端发送的消息
  socket.on('chat', (data) => {
    io.emit('chat', data)
  })

  // 当有客户端退出时，广播
  socket.on('disconnect', () => {
    io.emit(
      'chat',
      `有人退出了聊天室，当前聊天室人数：${io.engine.clientsCount}`,
    )
  })
})
