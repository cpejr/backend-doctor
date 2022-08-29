import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Conversa from 'App/Models/Conversa'
import ConversasDTO from 'App/DTO/ConversasDTO'
import ConversasRepository from 'App/Repositories/ConversasRepository'
import { limpaCamposNulosDeObjeto } from 'App/Utils/Utils'

export default class ConversasController {
  public async index({ request }: HttpContextContract) {
    const conversaData = {
      id: request.param('id'),
      id_remetente: request.param('id_usuario1'),
      id_destinatario: request.param('id_usuario2'),
    } as ConversasDTO
    const conversas = await ConversasRepository.find(limpaCamposNulosDeObjeto(conversaData))
    return conversas
  }

  public async store({ request }: HttpContextContract) {
    const id_usuario1 = request.input('id_usuario1')
    const id_usuario2 = request.input('id_usuario2')

    const conversa = await Conversa.create({
      id_usuario1,
      id_usuario2,
    })
    return conversa
  }

  public async update({ request }: HttpContextContract) {
    const id = request.param('id')
    if (!id) return

    const conversaData = {
      id,
      id_usuario1: request.input('id_usuario1'),
      id_usuario2: request.input('id_usuario2'),
    } as ConversasDTO

    const conversa = await Conversa.findOrFail(id)
    conversa.merge(limpaCamposNulosDeObjeto(conversaData))
    await conversa.save()

    return conversa
  }

  public async destroy({ request }: HttpContextContract) {
    const id = request.param('id')
    if (!id) return

    const conversa = await Conversa.findOrFail(id)
    await conversa.delete()

    return conversa
  }
}
