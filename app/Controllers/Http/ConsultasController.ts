import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Consulta from 'App/Models/Consulta'
import ConsultasDTO from 'App/DTO/ConsultasDTO'
import ConsultasRepository from 'App/Repositories/ConsultasRepository'
import { limpaCamposNulosDeObjeto } from 'App/Utils/Utils'
import ConsultaValidator from 'App/Validators/ConsultaValidator'
import { schema, rules } from '@ioc:Adonis/Core/Validator'
export default class ConsultasController {
  public async index({ request }: HttpContextContract) {
    const consultaData = {
      id: request.param('id'),
      data_hora: request.param('data_hora'),
      duracao_em_minutos: request.param('duracao_em_minutos'),
      descricao: request.param('descricao'),
      avaliacao: request.param('avaliacao'),
      id_usuario: request.param('id_usuario'),
      id_consultorio: request.param('id_consultorio'),
    } as ConsultasDTO
    const consultas = await ConsultasRepository.find(limpaCamposNulosDeObjeto(consultaData))
    return consultas
  }

  public async store({ request }: HttpContextContract) {
    const validateData = await request.validate(ConsultaValidator)

    const data_hora = validateData.data_hora
    const duracao_em_minutos = validateData.duracao_em_minutos
    const descricao = validateData.descricao
    const avaliacao = validateData.avaliacao
    const id_usuario = request.input('id_usuario')
    const id_consultorio = request.input('id_consultorio')

    const consulta = await Consulta.create({
      data_hora,
      duracao_em_minutos,
      descricao,
      avaliacao,
      id_usuario,
      id_consultorio,
    })
    return consulta
  }

  public async update({ request }: HttpContextContract) {
    const id = request.param('id')
    if (!id) return

    const validatorSchema = schema.create({
      data_hora: schema.date.optional({
        format: 'dd/MM/yyyy HH:mm:ss'
      }),
      duracao_em_minutos: schema.number.optional([rules.unsigned()]),
      descricao: schema.string.optional({ trim: true }),
      avaliacao: schema.number.optional([rules.range(0, 4)]),
    })

    const validateData = await request.validate({
      schema: validatorSchema,
      messages: {
        required: 'Digite um {{field}}',
        'avaliacao.range': 'Insira valores entre 1 e 3 em avaliacao',
        string: 'O campo {{field}} deve ser uma string',
        number: 'O campo {{field}} deve ser um inteiro',
        'date.format': 'A data_hora deve ser do formato dd/MM/yyyy HH:mm:ss',
        unsigned: 'A duracao_em_minutos deve ser um numero positivo'
      },
    })

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
