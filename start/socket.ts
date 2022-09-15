import Ws from 'App/Services/Ws'

Ws.boot()

Ws.io.on('connection', (socket) => {
  socket.on('adicionarUsuario', (usuarioId) => {
    if (socket['room']) return

    socket['room'] = usuarioId
    socket.join(usuarioId)

  })

  socket.on('enviarMensagem', ({ novaMensagem, receptorId }) => {
    socket.to(receptorId).emit('mensagemRecebida', novaMensagem)
  })

  socket.on('enviarConversa', ({ novaConversa, receptorId }) => {
    socket.to(receptorId).emit('conversaRecebida', novaConversa)
  })
})
