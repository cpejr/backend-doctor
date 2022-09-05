import Conversa from 'App/Models/Conversa'
import Ws from 'App/Services/Ws'

Ws.boot()

Ws.io.on('connection', (socket) => {

  socket.on("adicionarUsuario", (usuarioId) => {
    if (socket["room"]) return

    socket["room"] = usuarioId
    socket.join(usuarioId)

    console.log(`Socket ${socket.id} connected to room ${usuarioId}.`)
  })

  socket.on("enviarMensagem", ({ novaMensagem, receptorId}) => {
    socket.to(receptorId).emit("mensagemRecebida", novaMensagem)
  })

  socket.on("enviarConversa", (novaConversa) => {
    socket.to(novaConversa.id_receptor).emit("conversaRecebida", novaConversa)
  })

  socket.on("disconnect", () => {
    (Conversa.query().where({id_criador: socket["room"], ativada: false}).delete())
      .then((res) => {
        console.log(`Excluiu-se ${res} conversa(s) inativa(s).`)
      })
      .catch((err) => {
        console.error(err)
      })
      .finally(() => {
        socket.leave(socket["room"])
        console.log(`Socket com id ${socket.id} saiu da sessão.`)
      })
  })
})
