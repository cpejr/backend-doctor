import Route from '@ioc:Adonis/Core/Route'

Route.get('/', async () => {
  return { hello: 'world' }
})

Route.post('/arquivo', 'ArquivosController.store')


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
Route.post('/usuarios', 'UsuariosController.store')
Route.put('/usuarios/:id', 'UsuariosController.update')
Route.delete('/usuarios/:id', 'UsuariosController.destroy')

Route.get('/imagem_carrossels', 'ImagensCarrosselController.index')
Route.post('/imagem_carrossels', 'ImagensCarrosselController.store')
Route.put('/imagem_carrossels/:id', 'ImagensCarrosselController.update')
Route.delete('/imagem_carrossels/:id', 'ImagensCarrosselController.destroy')

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
Route.post('/conversas', 'ConversasController.store')
Route.put('/conversas/:id', 'ConversasController.update')
Route.delete('/conversas/:id', 'ConversasController.destroy')

Route.get('/mensagems', 'MensagemsController.index')
Route.post('/mensagems', 'MensagemsController.store')
Route.put('/mensagems/:id', 'MensagemsController.update')
Route.delete('/mensagems/:id', 'MensagemsController.destroy')

Route.get('/formularios_pacientes', 'FormulariosPacientesController.index')
Route.get('/formularios_pacientes/:id', 'FormulariosPacientesController.indexById')
Route.get('/formularios_pacientes_usuario/:id_usuario', 'FormulariosPacientesController.indexByIdUsuario')
Route.get('/formularios_pacientes_formularios/:id_formulario', 'FormulariosPacientesController.indexByIdFormulario')
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
