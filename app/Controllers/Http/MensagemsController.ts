import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Mensagem from 'App/Models/Mensagem'
import MensagemsDTO from 'App/DTO/MensagemsDTO'
import MensagemsRepository from 'App/Repositories/MensagemsRepository'
import { limpaCamposNulosDeObjeto } from 'App/Utils/Utils'
import { MensagemValidatorStore, MensagemValidatorUpdate } from 'App/Validators/MensagemValidator'

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
    const validateData = await request.validate(MensagemValidatorStore)

    const mensagem = validateData.mensagem
    const data_envio = validateData.data_envio
    const media_url = validateData.media_url
    const foi_enviado = validateData.foi_enviado
    const foi_visualizado = validateData.foi_visualizado
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

    const validateData = await request.validate(MensagemValidatorUpdate)

    const mensagens = await Mensagem.findOrFail(id)
    mensagens.merge(limpaCamposNulosDeObjeto(validateData))
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
