import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import ListaDeEsperaDispositivosDTO from 'App/DTO/ListaDeEsperaDispositivosDTO'
import ListaDeEsperaDispositivo from 'App/Models/ListaDeEsperaDispositivo'
import ListaDeEsperaDispositivosRepository from 'App/Repositories/ListaDeEsperaDispositivosRepository'
import { limpaCamposNulosDeObjeto } from 'App/Utils/Utils'

export default class ListaDeEsperaDispositivosController {
  public async index({ request }: HttpContextContract) {
    const listaDeEsperaDispositivoData = {
        id: request.param('id'),
        posicao: request.param('posicao'),
        esta_disponivel: request.param('esta_disponivel'),
        id_usuario: request.param('id_usuario'),
        id_dispositivo: request.param('id_dispositivo')
    } as ListaDeEsperaDispositivosDTO
    const listaDeEsperaDispositivos = await ListaDeEsperaDispositivosRepository.find(limpaCamposNulosDeObjeto(listaDeEsperaDispositivoData))
    return listaDeEsperaDispositivos
  }

  public async store({ request }: HttpContextContract) {
    const posicao = request.input('posicao')
    const esta_disponivel = request.input('esta_disponivel')
    const id_usuario = request.input('id_usuario')
    const id_dispositivo = request.input('id_dispositivo')

    const listaDeEsperaDispositivo = await ListaDeEsperaDispositivo.create({
      posicao,
      esta_disponivel,
      id_usuario,
      id_dispositivo
    })
    return listaDeEsperaDispositivo
  }

  public async update({ request }: HttpContextContract) {
    const id = request.param('id')
    if (!id) return

    const listaDeEsperaDispositivoData = {
      id,
      posicao: request.input('posicao'),
      esta_disponivel: request.input('esta_disponivel'),
      id_usuario: request.input('id_usuario'),
      id_dispositivo: request.input('id_dispositivo')
    } as ListaDeEsperaDispositivosDTO

    const listaDeEsperaDispositivo = await ListaDeEsperaDispositivo.findOrFail(id)
    listaDeEsperaDispositivo.merge(limpaCamposNulosDeObjeto(listaDeEsperaDispositivoData))
    await listaDeEsperaDispositivo.save()

    return listaDeEsperaDispositivo
  }

  public async destroy({ request }: HttpContextContract) {
    const id = request.param('id')
    if (!id) return

    const listaDeEsperaDispositivo = await ListaDeEsperaDispositivo.findOrFail(id)
    await listaDeEsperaDispositivo.delete()

    return listaDeEsperaDispositivo
  }
}
