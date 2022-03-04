import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Exame from 'App/Models/Exame'
import ExamesRepository from 'App/Repositories/ExamesRepository'
import ExamesDTO from 'App/DTO/ExamesDTO'
import { limpaCamposNulosDeObjeto } from 'App/Utils/Utils'
import ExameValidator from 'App/Validators/ExameValidator'
import { schema } from '@ioc:Adonis/Core/Validator'

export default class ExamesController {
  public async index({ request }: HttpContextContract) {
    const exameData = {
      id: request.param('id'),
      titulo: request.param('titulo'),
      texto: request.param('texto'),
    } as ExamesDTO
    const exames = await ExamesRepository.find(limpaCamposNulosDeObjeto(exameData))
    return exames
  }

  public async store({ request }: HttpContextContract) {
    const validateData = await request.validate(ExameValidator)

    const titulo = validateData.titulo
    const texto = validateData.texto

    const exame = await Exame.create({
      titulo,
      texto,
    })
    return exame
  }

  public async update({ request }: HttpContextContract) {
    const id = request.param('id')
    if (!id) return

    const validatorSchema = schema.create({
      titulo: schema.string.optional({
        trim: true,
      }),
      texto: schema.string.optional({
        trim: true,
      }),
    })

    const validateData = await request.validate({
      schema: validatorSchema,
      messages: {
        required: 'Digite um {{field}}',
        string: 'O campo {{field}} deve ser uma string'
      }
    })

    const exame = await Exame.findOrFail(id)
    exame.merge(limpaCamposNulosDeObjeto(validateData))
    await exame.save()

    return exame
  }

  public async destroy({ request }: HttpContextContract) {
    const id = request.param('id')
    if (!id) return

    const exame = await Exame.findOrFail(id)
    await exame.delete()

    return exame
  }
}
