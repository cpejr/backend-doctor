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
      conteudo: request.param('conteudo'),
      media_url: request.param('media_url'),
      foi_enviado: request.param('foi_enviado'),
      foi_visualizado: request.param('foi_visualizado'),
      id_conversa: request.param('id_conversa'),
      id_usuario: request.param('id_usuario')
    } as MensagemsDTO
    const mensagem = await MensagemsRepository.find(limpaCamposNulosDeObjeto(mensagemData))
    return mensagem
  }

  public async store({ request }: HttpContextContract) {
    const validateData = await request.validate(MensagemValidatorStore)

    const conteudo = validateData.conteudo
    const media_url = validateData.media_url
    const foi_enviado = validateData.foi_enviado
    const foi_visualizado = validateData.foi_visualizado
    const id_conversa = request.input('id_conversa')
    const id_usuario = request.input('id_usuario')


    const mensagens = await Mensagem.create({
      conteudo,
      media_url,
      foi_enviado,
      foi_visualizado,
      id_conversa,
      id_usuario
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
