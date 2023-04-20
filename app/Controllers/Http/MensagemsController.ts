import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Mensagem from 'App/Models/Mensagem'
import MensagemsDTO from 'App/DTO/MensagemsDTO'
import MensagemsRepository from 'App/Repositories/MensagemsRepository'
import { limpaCamposNulosDeObjeto } from 'App/Utils/Utils'
import { MensagemValidatorStore, MensagemValidatorUpdate } from 'App/Validators/MensagemValidator'
import ArquivosController from 'App/Controllers/Http/ArquivosController'
import Drive from '@ioc:Adonis/Core/Drive'

export default class MensagemsController {
  public async index({ request }: HttpContextContract) {
    const mensagemData = {
      id: request.param('id'),
      conteudo: request.param('conteudo'),
      media_url: request.param('media_url'),
      foi_visualizado: request.param('foi_visualizado'),
      id_conversa: request.param('id_conversa'),
      id_usuario: request.param('id_usuario'),
      tipo: request.param('tipo'),
    } as MensagemsDTO
    const mensagem = await MensagemsRepository.find(limpaCamposNulosDeObjeto(mensagemData))
    return mensagem
  }

  public async indexByConversaId({ request }: HttpContextContract) {
    const { id_usuario, id_conversa } = request.params()
    if (!id_conversa || !id_usuario) return

    const data = await Mensagem.query().where({ id_conversa }).orderBy('data_criacao', 'asc')

    const mensagens = data?.map((messagem, index) => {
      const pertenceAoUsuarioAtual = messagem.id_usuario === id_usuario

      return {
        id: messagem.id,
        id_usuario: messagem.id_usuario,
        conteudo: messagem.conteudo,
        media_url: messagem.media_url,
        data_criacao: messagem.data_criacao,
        foi_visualizado: messagem.foi_visualizado,
        tipo: messagem.tipo,
        pertenceAoUsuarioAtual,
      }
    })

    return mensagens
  }

  public async store({ request }: HttpContextContract) {
    const validateData = await request.validate(MensagemValidatorStore)

    const conteudo = validateData.conteudo
    let media_url = validateData.media_url
    const foi_visualizado = validateData.foi_visualizado
    const id_conversa = request.input('id_conversa')
    const id_usuario = request.input('id_usuario')
    let tipo = ""

    if (String(media_url).includes("PDF")) { tipo = "PDF" } else if (String(media_url).includes("doctor-app-image")) { tipo = "IMAGEM" } else { tipo = "TEXTO"; media_url = "" }

    
    const mensagem = await Mensagem.create({
      conteudo,
      media_url,
      foi_visualizado,
      id_conversa,
      id_usuario,
      tipo,
    })
    
    return mensagem
  }

  public async storePdf({ request }: HttpContextContract) {
    const validateData = await request.validate(MensagemValidatorStore)

    const arquivoscontroller: ArquivosController = new ArquivosController()

    const file = request.input('file')
    const res = await arquivoscontroller.store(file)

    const conteudo = undefined
    const media_url = res
    const foi_visualizado = validateData.foi_visualizado
    const id_conversa = request.input('id_conversa')
    const id_usuario = request.input('id_usuario')

    const mensagem = await Mensagem.create({
      conteudo,
      media_url,
      foi_visualizado,
      id_conversa,
      id_usuario,
    })

    return mensagem
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

  public async updateVizualizada({ request }: HttpContextContract) {
    const id = request.param('id')
    if (!id) return
    const mensagensAtualizadas = await Mensagem.query().where('id', id).update({
      foi_visualizado: true,
    })

    return mensagensAtualizadas
  }

  public async updateVisualizadasPorConversaId({ request }: HttpContextContract) {
    const { id_conversa, id_usuario } = request.params()
    if (!id_conversa || !id_usuario) return
    const mensagensAtualizadas = await Mensagem.query()
      .where('id_conversa', id_conversa)
      .whereNot({
        id_usuario,
        foi_visualizado: true,
      })
      .update({
        foi_visualizado: true,
      })

    return mensagensAtualizadas
  }

  public async destroy({ request }: HttpContextContract) {
    const id = request.param('id')
    if (!id) return

    const mensagens = await Mensagem.findOrFail(id)
    await mensagens.delete()

    return mensagens
  }
}
