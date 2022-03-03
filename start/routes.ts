/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for majority of projects, however you can define routes in different
| files and just make sure to import them inside this file. For example
|
| Define routes in following two files
| ├── start/routes/cart.ts
| ├── start/routes/customer.ts
|
| and then import them inside `start/routes.ts` as follows
|
| import './routes/cart'
| import './routes/customer'
|
*/

import Route from '@ioc:Adonis/Core/Route'

Route.get('/', async () => {
  return { hello: 'world' }
})


Route.get('/enderecos', 'EnderecosController.index')
Route.post('/enderecos', 'EnderecosController.store')
Route.put('/enderecos/:id', 'EnderecosController.update')
Route.delete('/enderecos/:id', 'EnderecosController.destroy')

Route.get('/formularios', 'FormulariosController.index')
Route.post('/formularios', 'FormulariosController.store')
Route.put('/formularios/:id', 'FormulariosController.update')
Route.delete('/formularios/:id', 'FormulariosController.destroy')

Route.get('/exames', 'ExamesController.index')
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

Route.get('/indicacao_especifica', 'IndicacoesEspecificasController.index')
Route.post('/indicacao_especifica', 'IndicacoesEspecificasController.store')
Route.put('/indicacao_especifica/:id', 'IndicacoesEspecificasController.update')
Route.delete('/indicacao_especifica/:id', 'IndicacoesEspecificasController.destroy')

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
Route.post('/consultorios', 'ConsultoriosController.store')
Route.put('/consultorios/:id', 'ConsultoriosController.update')
Route.delete('/consultorios/:id', 'ConsultoriosController.destroy')

Route.get('/indicacaos', 'IndicacaosController.index')
Route.post('/indicacaos', 'IndicacaosController.store')
Route.put('/indicacaos/:id', 'IndicacaosController.update')
Route.delete('/indicacaos/:id', 'IndicacaosController.destroy')

Route.get('/usuarios', 'UsuariosController.index')
Route.post('/usuarios', 'UsuariosController.store')
Route.put('/usuarios/:id', 'UsuariosController.update')
Route.delete('/usuarios/:id', 'UsuariosController.destroy')

Route.get('/imagem_carrossels', 'ImagensCarrosselController.index')
Route.post('/imagem_carrossels', 'ImagensCarrosselController.store')
Route.put('/imagem_carrossels/:id', 'ImagensCarrosselController.update')
Route.delete('/imagem_carrossels/:id', 'ImagensCarrosselController.destroy')

Route.get('/receitas', 'ReceitasController.index')
Route.post('/receitas', 'ReceitasController.store')
Route.put('/receitas/:id', 'ReceitasController.update')
Route.delete('/receitas/:id', 'ReceitasController.destroy')

Route.get('/conversas', 'ConversasController.index')
Route.post('/conversas', 'ConversasController.store')
Route.put('/conversas/:id', 'ConversasController.update')
Route.delete('/conversas/:id', 'ConversasController.destroy')

Route.get('/mensagems', 'MensagemsController.index')
Route.post('/mensagems', 'MensagemsController.store')
Route.put('/mensagems/:id', 'MensagemsController.update')
Route.delete('/mensagems/:id', 'MensagemsController.destroy')
