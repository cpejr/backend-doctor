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

Route.get('/indicacoes_especificas', 'IndicacoesEspecificasController.index')
Route.post('/indicacoes_especificas', 'IndicacoesEspecificasController.store')
Route.put('/indicacoes_especificas/:id', 'IndicacoesEspecificasController.update')
Route.delete('/indicacoes_especificas/:id', 'IndicacoesEspecificasController.destroy')
