import { Router } from '@adonisjs/core/build/standalone'
import Route from '@ioc:Adonis/Core/Route'
import ArquivosController from 'App/Controllers/Http/ArquivosController'
Route.get('/', async () => {
  return { hello: 'world' }
})

Route.post('/arquivo', async (ctx) => {
  return new ArquivosController().store(ctx)
}).middleware('auth')
Route.post('/arquivofile/', async (ctx) => {
  return new ArquivosController().storeFile(ctx)
}).middleware('auth')
Route.post('/arquivoimage/', async (ctx) => {
  return new ArquivosController().storeImage(ctx)
}).middleware('auth')
Route.post('/arquivopdf/', 'ArquivosController.storePdf').middleware('auth')
Route.get('/arquivo/:chave', 'ArquivosController.indexByChave')
Route.delete('/arquivo/:chave', 'ArquivosController.destroy').middleware('auth')

Route.get('/enderecos', 'EnderecosController.index')
Route.get('/enderecos/:id', 'EnderecosController.indexById')
Route.post('/enderecos', 'EnderecosController.store').middleware('auth')
Route.put('/enderecos/:id', 'EnderecosController.update').middleware('auth')
Route.delete('/enderecos/:id', 'EnderecosController.destroy').middleware('auth')

Route.get('/formularios', 'FormulariosController.index')
Route.get('/formularios/:id', 'FormulariosController.indexById')
Route.get('/formularios_usuario/:id_usuario', 'FormulariosController.indexByIdUsuario')
Route.post('/formularios', 'FormulariosController.store').middleware('auth')
Route.put('/formularios/:id', 'FormulariosController.update').middleware('auth')
Route.delete('/formularios/:id', 'FormulariosController.destroy').middleware('auth')

Route.get('/exames', 'ExamesController.index')
Route.get('/exames/:id', 'ExamesController.indexById')
Route.post('/exames', 'ExamesController.store').middleware('auth')
Route.put('/exames/:id', 'ExamesController.update').middleware('auth')
Route.delete('/exames/:id', 'ExamesController.destroy').middleware('auth')

Route.get('/assinaturas', 'AssinaturasController.index')
Route.post('/assinaturas', 'AssinaturasController.store').middleware('auth')
Route.put('/assinaturas/:id', 'AssinaturasController.update').middleware('auth')
Route.delete('/assinaturas/:id', 'AssinaturasController.destroy').middleware('auth')

Route.get('/dispositivos', 'DispositivosController.index')
Route.get('/dispositivos/:id', 'DispositivosController.indexByIdDispositivo')
Route.post('/dispositivos', 'DispositivosController.store').middleware('auth')
Route.put('/dispositivos/:id', 'DispositivosController.update').middleware('auth')
Route.delete('/dispositivos/:id', 'DispositivosController.destroy').middleware('auth')

Route.get('/homes', 'HomesController.index')
Route.post('/homes', 'HomesController.store').middleware('auth')
Route.put('/homes/:id', 'HomesController.update').middleware('auth')
Route.delete('/homes/:id', 'HomesController.destroy').middleware('auth')

Route.get('/indicacoes_especificas', 'IndicacoesEspecificasController.index')
Route.post('/indicacoes_especificas', 'IndicacoesEspecificasController.store').middleware('auth')
Route.put('/indicacoes_especificas/:id', 'IndicacoesEspecificasController.update').middleware('auth')
Route.delete('/indicacoes_especificas/:id', 'IndicacoesEspecificasController.destroy').middleware('auth')

Route.get('/comentarios', 'ComentariosController.index')
Route.post('/comentarios', 'ComentariosController.store').middleware('auth')
Route.put('/comentarios/:id', 'ComentariosController.update').middleware('auth')
Route.delete('/comentarios/:id', 'ComentariosController.destroy').middleware('auth')

Route.get('/sobremims', 'SobreMimsController.index')
Route.post('/sobremims', 'SobreMimsController.store').middleware('auth')
Route.put('/sobremims/:id', 'SobreMimsController.update').middleware('auth')
Route.delete('/sobremims/:id', 'SobreMimsController.destroy').middleware('auth')

Route.get('/consultorios', 'ConsultoriosController.index')
Route.get('/consultorios/:id', 'ConsultoriosController.indexByIdConsultorio')
Route.post('/consultorios', 'ConsultoriosController.store').middleware('auth')
Route.put('/consultorios/:id', 'ConsultoriosController.update').middleware('auth')
Route.delete('/consultorios/:id', 'ConsultoriosController.destroy').middleware('auth')

Route.get('/indicacaos', 'IndicacaosController.index').middleware('auth')
Route.post('/indicacaos', 'IndicacaosController.store').middleware('auth')
Route.put('/indicacaos/:id', 'IndicacaosController.update').middleware('auth')
Route.delete('/indicacaos/:id', 'IndicacaosController.destroy').middleware('auth')

Route.get('/usuarios', 'UsuariosController.index')
Route.get('/usuarios/:email', 'UsuariosController.indexByEmail')
Route.get('/usuarios_id/:id', 'UsuariosController.indexByIdUsuario')
Route.get('/usuarios_token/:token_usuario', 'UsuariosController.indexByToken')
Route.get('/usuarios_receitas/:id', 'UsuariosController.indexById')
Route.post('/usuarios', 'UsuariosController.store').middleware('auth')
Route.put('/usuarios/:id', 'UsuariosController.update').middleware('auth')
Route.post('/usuariosimagem/:id', 'UsuariosController.updateImagem').middleware('auth')
Route.put('/usuariosdeletarimagem/:id', 'UsuariosController.deleteImagem').middleware('auth')
Route.put('/alterar_senha/:email', 'UsuariosController.alteracaoDeSenha').middleware('auth')
Route.delete('/usuarios/:id', 'UsuariosController.destroy').middleware('auth')

Route.get('/imagem_carrossels', 'ImagensCarrosselController.index')
Route.post('/imagem_carrossels', 'ImagensCarrosselController.store').middleware('auth')
Route.put('/imagem_carrossels/:id', 'ImagensCarrosselController.update').middleware('auth')
Route.delete('/imagem_carrossels/:id', 'ImagensCarrosselController.destroy').middleware('auth')

Route.get('/receitas/:id', 'ReceitasController.indexPdfLink')
Route.get('/receitas', 'ReceitasController.index')
Route.get('/receitas/:id_usuario', 'ReceitasController.indexByIdUsuario')
Route.post('/receitas', 'ReceitasController.store').middleware('auth')
Route.put('/receitas/:id', 'ReceitasController.update').middleware('auth')
Route.delete('/receitas/:id', 'ReceitasController.destroy').middleware('auth')

Route.get('/lista_de_espera_dispositivos', 'ListaDeEsperaDispositivosController.index')
Route.post('/lista_de_espera_dispositivos', 'ListaDeEsperaDispositivosController.store').middleware('auth')
Route.put('/lista_de_espera_dispositivos/:id', 'ListaDeEsperaDispositivosController.update').middleware('auth')
Route.delete('/lista_de_espera_dispositivos/:id', 'ListaDeEsperaDispositivosController.destroy').middleware('auth')

Route.get('/conversas', 'ConversasController.index')
Route.get('/conversas/:id_usuario/usuario', 'ConversasController.indexByUsuarioId')
Route.post('/conversas', 'ConversasController.store').middleware('auth')
Route.post('/conversas_whatsapp/:id_usuario', 'ConversasController.enviarMensagemConfirmarPagamento').middleware('auth')
Route.put('/conversas/:id', 'ConversasController.update').middleware('auth')
Route.put('/conversas/ativacao/:id', 'ConversasController.updateAtivada').middleware('auth')
Route.put('/conversas/finalizacao/:id', 'ConversasController.updateFinalizada').middleware('auth')
Route.delete('/conversas/:id', 'ConversasController.destroy').middleware('auth')
Route.delete('/conversas/:id_usuario/usuario', 'ConversasController.destroyByUsuarioId').middleware('auth')

Route.get('/mensagems', 'MensagemsController.index')
Route.get('/mensagems/:id_conversa/conversa/:id_usuario', 'MensagemsController.indexByConversaId')
Route.post('/mensagems', 'MensagemsController.store')
Route.post('/mensagemsfile', 'MensagemsController.storePdf')
Route.put('/mensagems/:id', 'MensagemsController.update')
Route.put(
  '/mensagems/:id_conversa/visualizadas/:id_usuario',
  'MensagemsController.updateVisualizadasPorConversaId'
).middleware('auth')
Route.delete('/mensagems/:id', 'MensagemsController.destroy').middleware('auth')

Route.get('/formularios_pacientes', 'FormulariosPacientesController.index')
Route.get('/formularios_pacientes/:id', 'FormulariosPacientesController.indexById')
Route.get(
  '/formularios_pacientes_usuario/:id_usuario',
  'FormulariosPacientesController.indexByIdUsuario'
)
Route.get(
  '/formularios_pacientes_formularios/:id_formulario',
  'FormulariosPacientesController.indexByIdFormulario'
)
Route.post('/formularios_pacientes', 'FormulariosPacientesController.store').middleware('auth')
Route.put('/formularios_pacientes/:id', 'FormulariosPacientesController.update').middleware('auth')
Route.delete('/formularios_pacientes/:id', 'FormulariosPacientesController.destroy').middleware('auth')

Route.get('/consultas', 'ConsultasController.index')
Route.get('/usuarioconsultas/:id', 'ConsultasController.indexByIdUsuario')
Route.get('/consultas/:id_usuario', 'ConsultasController.indexByIdUsuario')
Route.get('/consultas-id/:id', 'ConsultasController.indexById')

Route.post('/consultas', 'ConsultasController.store').middleware('auth')
Route.put('/consultas/:id', 'ConsultasController.update').middleware('auth')
Route.delete('/consultas/:id', 'ConsultasController.destroy').middleware('auth')

Route.get('/amies', 'AmiesController.index')
Route.post('/amies', 'AmiesController.store').middleware('auth')
Route.put('/amies/:id', 'AmiesController.update').middleware('auth')
Route.delete('/amies/:id', 'AmiesController.destroy').middleware('auth')

Route.get('/exame_marcados', 'ExamesMarcadosController.index')
Route.get('/exame_marcados/:id_usuario', 'ExamesMarcadosController.indexByIdUsuario')
Route.post('/exame_marcados', 'ExamesMarcadosController.store').middleware('auth')
Route.put('/exame_marcados/:id', 'ExamesMarcadosController.update').middleware('auth')
Route.delete('/exame_marcados/:id', 'ExamesMarcadosController.destroy').middleware('auth')

Route.post('/login','SessoesController.login')
Route.post('/verificar', 'SessoesController.verificarSenha')

Route.get('/medicos_indicados', 'MedicosIndicadosController.index')
Route.get('/medicos_indicados/:id_indicacao_especifica', 'MedicosIndicadosController.indexByIdIndicacao')
Route.post('/medicos_indicados', 'MedicosIndicadosController.store').middleware('auth')
Route.put('/medicos_indicados/:id', 'MedicosIndicadosController.update').middleware('auth')
Route.delete('/medicos_indicados/:id', 'MedicosIndicadosController.destroy').middleware('auth')

Route.get('/token_usuarios', 'TokenUsuariosController.index')
Route.post('/token_usuarios', 'TokenUsuariosController.store')
Route.put('/token_usuarios/:id_usuario', 'TokenUsuariosController.update')
Route.delete('/token_usuarios/:id_usuario', 'TokenUsuariosController.destroy')