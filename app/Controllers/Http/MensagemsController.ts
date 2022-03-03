import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Mensagem from 'App/Models/Mensagem'
import MensagemsDTO from 'App/DTO/MensagemsDTO'
import MensagemsRepository from 'App/Repositories/MensagemsRepository'
import { limpaCamposNulosDeObjeto } from 'App/Utils/Utils'

export default class MensagemsController {
  public async index({ request }: HttpContextContract) {
    const mensagemData = {
      id: request.param('id'),
      mensagem: request.param('mensagem'),
      data_envio: request.param('data_envio'),
      media_url: request.param('media_url'),
      foi_enviado: request.param('foi_enviado'),
      foi_visualizado: request.param('foi_visualizado'),
      id_conversa: request.param('id_conversa'),
    } as MensagemsDTO
    const mensagem = await MensagemsRepository.find(limpaCamposNulosDeObjeto(mensagemData))
    return mensagem
  }

  public async store({ request }: HttpContextContract) {
    const mensagem = request.input('mensagem')
    const data_envio = request.input('data_envio')
    const media_url = request.input('media_url')
    const foi_enviado = request.input('foi_enviado')
    const foi_visualizado = request.input('foi_visualizado')
    const id_conversa = request.input('id_conversa')

    const mensagens = await Mensagem.create({
      mensagem,
      data_envio,
      media_url,
      foi_enviado,
      foi_visualizado,
      id_conversa,
    })
    return mensagens
  }

  public async update({ request }: HttpContextContract) {
    const id = request.param('id')
    if (!id) return

    const mensagemData = {
      id,
      mensagem: request.input('mensagem'),
      data_envio: request.input('data_envio'),
      media_url: request.input('media_url'),
      foi_enviado: request.input('foi_enviado'),
      foi_visualizado: request.input('foi_visualizado'),
      id_conversa: request.input('id_conversa'),
    } as MensagemsDTO

    const mensagens = await Mensagem.findOrFail(id)
    mensagens.merge(limpaCamposNulosDeObjeto(mensagemData))
    await mensagens.save()

    return mensagens
  }

  public async destroy({ request }: HttpContextContract) {
    const id = request.param('id')
    if (!id) return

    const mensagens = await Mensagem.findOrFail(id)
    await mensagens.delete()

    return mensagens
  }
}
