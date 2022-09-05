import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Conversa from 'App/Models/Conversa'
import ConversasDTO from 'App/DTO/ConversasDTO'
import ConversasRepository from 'App/Repositories/ConversasRepository'
import { limpaCamposNulosDeObjeto } from 'App/Utils/Utils'
export default class ConversasController {
  public async index({ request }: HttpContextContract) {
    const conversaData = {
      id: request.param('id'),
      id_criador: request.param('id_criador'),
      id_receptor: request.param('id_receptor'),
    } as ConversasDTO
    const conversas = await ConversasRepository.find(limpaCamposNulosDeObjeto(conversaData))
    return conversas
  }

  public async indexByUsuarioId({ request }: HttpContextContract) {
    const id_usuario = request.param('id_usuario')
    if (!id_usuario) return

    const data = await Conversa.query()
      .where('id_criador', id_usuario)
      .orWhere({ id_receptor: id_usuario, ativada: true })
      .preload('criador', (query) => {
        query.select('id', 'nome', 'avatar_url')
      })
      .preload('receptor', (query) => {
        query.select('id', 'nome', 'avatar_url')
      })
      .preload('mensagem', (query) => {
        query
          .orderBy('data_criacao', 'desc')
          .select('id_usuario', 'conteudo', 'foi_visualizado', 'data_criacao')
      })
      .withCount('mensagem', (query) => {
        query
          .where('foi_visualizado', false)
          .whereNot('id_usuario', id_usuario)
          .as('mensagensNaoVistas')
      })

  const conversas = data
    .map((conversa) => {
      const ultima_mensagem = conversa.mensagem[0]?.toObject();
      if (ultima_mensagem) {
        delete ultima_mensagem.$extras
        ultima_mensagem['pertenceAoUsuarioAtual'] = ultima_mensagem.id_usuario === id_usuario
      }

      return {
        id: conversa.id,
        conversaCom: conversa.id_criador === id_usuario ? conversa.receptor : conversa.criador,
        ativada: conversa.ativada,
        ultima_mensagem,
        mensagensNaoVistas: +conversa.$extras.mensagensNaoVistas,
      }
    })
    .sort((c1, c2) =>
      c2.ultima_mensagem.data_criacao.diff(c1.ultima_mensagem.data_criacao
    ))

    return conversas
  }

  public async store({ request }: HttpContextContract) {
    const id_criador = request.input('id_criador')
    const id_receptor = request.input('id_receptor')

    const conversa = await Conversa.create({
      id_criador,
      id_receptor,
    })
    return conversa
  }

  public async update({ request }: HttpContextContract) {
    const id = request.param('id')
    if (!id) return

    const conversaData = {
      id,
      id_criador: request.input('id_criador'),
      id_receptor: request.input('id_receptor'),
    } as ConversasDTO

    const conversa = await Conversa.findOrFail(id)
    conversa.merge(limpaCamposNulosDeObjeto(conversaData))
    await conversa.save()

    return conversa
  }

  public async updateAtivada({ request }: HttpContextContract) {
    const id = request.param('id')
    if (!id) return

    const conversa = await Conversa.query().where({ id, ativada: false }).update({
      ativada: true
    })

    return conversa
  }

  public async destroy({ request }: HttpContextContract) {
    const id = request.param('id')
    if (!id) return

    const conversa = await Conversa.findOrFail(id)
    await conversa.delete()

    return conversa
  }

  public async destroyByUsuarioId({ request }: HttpContextContract) {
    const id_usuario = request.param('id_usuario')
    if (!id_usuario) return

    const conversa = await Conversa.query().where({ id_criador: id_usuario, ativada: false }).delete()
    return conversa
  }
}
