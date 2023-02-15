import { Router } from '@adonisjs/core/build/standalone'
import Route from '@ioc:Adonis/Core/Route'
import ArquivosController from 'App/Controllers/Http/ArquivosController'

Route.get('/', async () => {
  return { hello: 'world' }
})

Route.post('/arquivo', async (ctx) => {
  return new ArquivosController().store(ctx)
})
Route.post('/arquivopdf/', 'ArquivosController.storePdf')
Route.get('/arquivo/:chave', 'ArquivosController.indexByChave')
Route.delete('/arquivo/:chave', 'ArquivosController.destroy')

Route.get('/enderecos', 'EnderecosController.index')
Route.get('/enderecos/:id', 'EnderecosController.indexById')
Route.post('/enderecos', 'EnderecosController.store')
Route.put('/enderecos/:id', 'EnderecosController.update')
Route.delete('/enderecos/:id', 'EnderecosController.destroy')

Route.get('/formularios', 'FormulariosController.index')
Route.get('/formularios/:id', 'FormulariosController.indexById')
Route.get('/formularios_usuario/:id_usuario', 'FormulariosController.indexByIdUsuario')
Route.post('/formularios', 'FormulariosController.store')
Route.put('/formularios/:id', 'FormulariosController.update')
Route.delete('/formularios/:id', 'FormulariosController.destroy')

Route.get('/exames', 'ExamesController.index')
Route.get('/exames/:id', 'ExamesController.indexById')
Route.post('/exames', 'ExamesController.store')
Route.put('/exames/:id', 'ExamesController.update')
Route.delete('/exames/:id', 'ExamesController.destroy')

Route.get('/assinaturas', 'AssinaturasController.index')
Route.post('/assinaturas', 'AssinaturasController.store')
Route.put('/assinaturas/:id', 'AssinaturasController.update')
Route.delete('/assinaturas/:id', 'AssinaturasController.destroy')

Route.get('/dispositivos', 'DispositivosController.index')
Route.get('/dispositivos/:id', 'DispositivosController.indexByIdDispositivo')
Route.post('/dispositivos', 'DispositivosController.store')
Route.put('/dispositivos/:id', 'DispositivosController.update')
Route.delete('/dispositivos/:id', 'DispositivosController.destroy')

Route.get('/homes', 'HomesController.index')
Route.post('/homes', 'HomesController.store')
Route.put('/homes/:id', 'HomesController.update')
Route.delete('/homes/:id', 'HomesController.destroy')

Route.get('/indicacoes_especificas', 'IndicacoesEspecificasController.index')
Route.post('/indicacoes_especificas', 'IndicacoesEspecificasController.store')
Route.put('/indicacoes_especificas/:id', 'IndicacoesEspecificasController.update')
Route.delete('/indicacoes_especificas/:id', 'IndicacoesEspecificasController.destroy')

Route.get('/comentarios', 'ComentariosController.index')
Route.post('/comentarios', 'ComentariosController.store')
Route.put('/comentarios/:id', 'ComentariosController.update')
Route.delete('/comentarios/:id', 'ComentariosController.destroy')

Route.get('/sobremims', 'SobreMimsController.index')
Route.post('/sobremims', 'SobreMimsController.store')
Route.put('/sobremims/:id', 'SobreMimsController.update')
Route.delete('/sobremims/:id', 'SobreMimsController.destroy')

Route.get('/consultorios', 'ConsultoriosController.index')
Route.get('/consultorios/:id', 'ConsultoriosController.indexByIdConsultorio')
Route.post('/consultorios', 'ConsultoriosController.store')
Route.put('/consultorios/:id', 'ConsultoriosController.update')
Route.delete('/consultorios/:id', 'ConsultoriosController.destroy')

Route.get('/indicacaos', 'IndicacaosController.index')
Route.post('/indicacaos', 'IndicacaosController.store')
Route.put('/indicacaos/:id', 'IndicacaosController.update')
Route.delete('/indicacaos/:id', 'IndicacaosController.destroy')

Route.get('/usuarios', 'UsuariosController.index')
Route.get('/usuarios/:email', 'UsuariosController.indexByEmail')
Route.get('/usuarios_id/:id', 'UsuariosController.indexByIdUsuario')
Route.get('/usuarios_token/:token_usuario', 'UsuariosController.indexByToken')
Route.get('/usuarios_receitas/:id', 'UsuariosController.indexById')
Route.post('/usuarios', 'UsuariosController.store')
Route.put('/usuarios/:id', 'UsuariosController.update')
Route.post('/usuariosimagem/:id', 'UsuariosController.updateImagem')
Route.put('/usuariosdeletarimagem/:id', 'UsuariosController.deleteImagem')
Route.put('/alterar_senha/:email', 'UsuariosController.alteracaoDeSenha')
Route.delete('/usuarios/:id', 'UsuariosController.destroy')

Route.get('/imagem_carrossels', 'ImagensCarrosselController.index')
Route.post('/imagem_carrossels', 'ImagensCarrosselController.store')
Route.put('/imagem_carrossels/:id', 'ImagensCarrosselController.update')
Route.delete('/imagem_carrossels/:id', 'ImagensCarrosselController.destroy')

Route.get('/receitas/:id', 'ReceitasController.indexPdfLink')
Route.get('/receitas', 'ReceitasController.index')
Route.get('/receitas/:id_usuario', 'ReceitasController.indexByIdUsuario')
Route.post('/receitas', 'ReceitasController.store')
Route.put('/receitas/:id', 'ReceitasController.update')
Route.delete('/receitas/:id', 'ReceitasController.destroy')

Route.get('/lista_de_espera_dispositivos', 'ListaDeEsperaDispositivosController.index')
Route.post('/lista_de_espera_dispositivos', 'ListaDeEsperaDispositivosController.store')
Route.put('/lista_de_espera_dispositivos/:id', 'ListaDeEsperaDispositivosController.update')
Route.delete('/lista_de_espera_dispositivos/:id', 'ListaDeEsperaDispositivosController.destroy')

Route.get('/conversas', 'ConversasController.index')
Route.get('/conversas/:id_usuario/usuario', 'ConversasController.indexByUsuarioId')
Route.post('/conversas', 'ConversasController.store')
Route.post('/conversas_whatsapp/:id_usuario', 'ConversasController.enviarMensagemConfirmarPagamento')
Route.put('/conversas/:id', 'ConversasController.update')
Route.put('/conversas/ativacao/:id', 'ConversasController.updateAtivada')
Route.put('/conversas/finalizacao/:id', 'ConversasController.updateFinalizada')
Route.delete('/conversas/:id', 'ConversasController.destroy')
Route.delete('/conversas/:id_usuario/usuario', 'ConversasController.destroyByUsuarioId')

Route.get('/mensagems', 'MensagemsController.index')
Route.get('/mensagems/:id_conversa/conversa/:id_usuario', 'MensagemsController.indexByConversaId')
Route.post('/mensagems', 'MensagemsController.store')
Route.put('/mensagems/:id', 'MensagemsController.update')
Route.put(
  '/mensagems/:id_conversa/visualizadas/:id_usuario',
  'MensagemsController.updateVisualizadasPorConversaId'
)
Route.delete('/mensagems/:id', 'MensagemsController.destroy')

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
Route.post('/formularios_pacientes', 'FormulariosPacientesController.store')
Route.put('/formularios_pacientes/:id', 'FormulariosPacientesController.update')
Route.delete('/formularios_pacientes/:id', 'FormulariosPacientesController.destroy')

Route.get('/consultas', 'ConsultasController.index')
Route.get('/usuarioconsultas/:id', 'ConsultasController.indexByIdUsuario')
Route.get('/consultas/:id_usuario', 'ConsultasController.indexByIdUsuario')
Route.get('/consultas-id/:id', 'ConsultasController.indexById')

Route.post('/consultas', 'ConsultasController.store')
Route.put('/consultas/:id', 'ConsultasController.update')
Route.delete('/consultas/:id', 'ConsultasController.destroy')

Route.get('/amies', 'AmiesController.index')
Route.post('/amies', 'AmiesController.store')
Route.put('/amies/:id', 'AmiesController.update')
Route.delete('/amies/:id', 'AmiesController.destroy')

Route.get('/exame_marcados', 'ExamesMarcadosController.index')
Route.get('/exame_marcados/:id_usuario', 'ExamesMarcadosController.indexByIdUsuario')
Route.post('/exame_marcados', 'ExamesMarcadosController.store')
Route.put('/exame_marcados/:id', 'ExamesMarcadosController.update')
Route.delete('/exame_marcados/:id', 'ExamesMarcadosController.destroy')

Route.post('/login', 'SessoesController.login')
Route.post('/verificar', 'SessoesController.verificarSenha')

Route.get('/medicos_indicados', 'MedicosIndicadosController.index')
Route.get('/medicos_indicados/:id_indicacao_especifica', 'MedicosIndicadosController.indexByIdIndicacao')
Route.post('/medicos_indicados', 'MedicosIndicadosController.store')
Route.put('/medicos_indicados/:id', 'MedicosIndicadosController.update')
Route.delete('/medicos_indicados/:id', 'MedicosIndicadosController.destroy')

Route.get('/token_usuarios', 'TokenUsuariosController.index')
Route.post('/token_usuarios', 'TokenUsuariosController.store')
Route.put('/token_usuarios/:id_usuario', 'TokenUsuariosController.update')
Route.delete('/token_usuarios/:id_usuario', 'TokenUsuariosController.destroy')