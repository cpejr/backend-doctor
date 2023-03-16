import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Consulta from 'App/Models/Consulta'
import ConsultasDTO from 'App/DTO/ConsultasDTO'
import ConsultasRepository from 'App/Repositories/ConsultasRepository'
import { limpaCamposNulosDeObjeto } from 'App/Utils/Utils'
import { ConsultaValidatorStore, ConsultaValidatorUpdate } from 'App/Validators/ConsultaValidator'

export default class ConsultasController {
  public async index({ request }: HttpContextContract) {
    const consultaData = {
      id: request.param('id'),
      data_hora: request.param('data_hora'),
      duracao_em_minutos: request.param('duracao_em_minutos'),
      descricao: request.param('descricao'),
      tipo: request.param('tipo'),
      avaliacao: request.param('avaliacao'),
      id_usuario: request.param('id_usuario'),
      id_consultorio: request.param('id_consultorio'),
      notificacao: request.param('notificacao'),

    } as ConsultasDTO
    const consultas = await ConsultasRepository.find(limpaCamposNulosDeObjeto(consultaData))
    return consultas
  }

  public async indexByIdUsuario({ request }: HttpContextContract) {
    const consultaData = {
      id_usuario: request.param('id_usuario'),
    } as ConsultasDTO

    const consultas = await ConsultasRepository.find(consultaData)

    return consultas
  }

  public async indexById({ request }: HttpContextContract) {
    const id = request.param('id')
    if (!id) return

    const consulta = await Consulta.findOrFail(id)

    return consulta
  }


  public async store({ request }: HttpContextContract) {
    const validateData = await request.validate(ConsultaValidatorStore)

    const data_hora = validateData.data_hora
    const duracao_em_minutos = validateData.duracao_em_minutos
    const descricao = validateData.descricao
    const tipo = validateData.tipo
    const avaliacao = validateData.avaliacao
    const id_usuario = request.input('id_usuario')
    const id_consultorio = request.input('id_consultorio')
    const notificacao = false

    const consulta = await Consulta.create({
      data_hora,
      duracao_em_minutos,
      descricao,
      tipo,
      avaliacao,
      id_usuario,
      id_consultorio,
      notificacao,
    })
    return consulta
  }

  public async update({ request }: HttpContextContract) {
    const id = request.param('id')
    if (!id) return

    const validateData = await request.validate(ConsultaValidatorUpdate)

    const consulta = await Consulta.findOrFail(id)
    consulta.merge(limpaCamposNulosDeObjeto(validateData))
    await consulta.save()

    return consulta
  }

  public async destroy({ request }: HttpContextContract) {
    const id = request.param('id')
    if (!id) return

    const consulta = await Consulta.findOrFail(id)
    await consulta.delete()

    return consulta
  }
}
