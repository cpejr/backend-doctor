import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Consultorio from 'App/Models/Consultorio'
import ConsultoriosDTO from 'App/DTO/ConsultoriosDTO'
import ConsultoriosRepository from 'App/Repositories/ConsultoriosRepository'
import { limpaCamposNulosDeObjeto } from 'App/Utils/Utils'
import ConsultorioValidator from 'App/Validators/ConsultorioValidator'
import { schema, rules } from '@ioc:Adonis/Core/Validator'

export default class ConsultoriosController {
  public async index({ request }: HttpContextContract) {
    const consultorioData = {
      id: request.param('id'),
      nome: request.param('nome'),
      id_endereco: request.param('id_endereco'),
    } as ConsultoriosDTO
    const consultorios = await ConsultoriosRepository.find(limpaCamposNulosDeObjeto(consultorioData))
    return consultorios
  }

  public async store({ request }: HttpContextContract) {
    const validateData = await request.validate(ConsultorioValidator)

    const nome = validateData.nome
    const id_endereco = request.input('id_endereco')

    const consultorio = await Consultorio.create({
      nome,
      id_endereco
    })
    return consultorio
  }

  public async update({ request }: HttpContextContract) {
    const id = request.param('id')
    if (!id) return

    const validatorSchema = schema.create({
      nome: schema.string.optional({ trim: true }),
    })

    const validateData = await request.validate({
      schema: validatorSchema,
      messages: {
        string: 'O campo {{field}} deve ser uma string',
      }
    })

    const consultorio = await Consultorio.findOrFail(id)
    consultorio.merge(limpaCamposNulosDeObjeto(validateData))
    await consultorio.save()

    return consultorio
  }

  public async destroy({ request }: HttpContextContract) {
    const id = request.param('id')
    if (!id) return

    const consultorio = await Consultorio.findOrFail(id)
    await consultorio.delete()

    return consultorio
  }
}
