import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Conversa from 'App/Models/Conversa'
import ConversasDTO from 'App/DTO/ConversasDTO'
import ConversasRepository from 'App/Repositories/ConversasRepository'
import { limpaCamposNulosDeObjeto } from 'App/Utils/Utils'

export default class ConversasController {
  public async index({ request }: HttpContextContract) {
    const conversaData = {
      id: request.param('id'),
      id_remetente: request.param('id_remetente'),
      id_destinatario: request.param('id_destinatario'),
    } as ConversasDTO
    const conversas = await ConversasRepository.find(limpaCamposNulosDeObjeto(conversaData))
    return conversas
  }

  public async store({ request }: HttpContextContract) {
    const id_remetente = request.input('id_remetente')
    const id_destinatario = request.input('id_destinatario')

    const conversa = await Conversa.create({
      id_remetente,
      id_destinatario,
    })
    return conversa
  }

  public async update({ request }: HttpContextContract) {
    const id = request.param('id')
    if (!id) return

    const conversaData = {
      id,
      id_remetente: request.input('id_remetente'),
      id_destinatario: request.input('id_destinatario'),
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
