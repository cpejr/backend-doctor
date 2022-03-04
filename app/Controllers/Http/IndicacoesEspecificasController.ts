import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import IndicacoesEspecificasDTO from 'App/DTO/IndicacoesEspecificasDTO'
import IndicacoesEspecificasRepository from 'App/Repositories/IndicacoesEspecificasRepository'
import { limpaCamposNulosDeObjeto } from 'App/Utils/Utils'
import IndicacaoEspecifica from 'App/Models/IndicacaoEspecifica'
import IndicacaoEspecificaValidator from 'App/Validators/IndicacaoEspecificaValidator'
import { schema } from '@ioc:Adonis/Core/Validator'

export default class IndicacaoEspecificasController {
  public async index({ request }: HttpContextContract) {
    const indicacaoEspecificaData = {
      id: request.param('id'),
      titulo: request.param('titulo'),
      texto: request.param('texto'),
    } as IndicacoesEspecificasDTO
    const indicacoesEspecificas = await IndicacoesEspecificasRepository.find(
      limpaCamposNulosDeObjeto(indicacaoEspecificaData)
    )
    return indicacoesEspecificas
  }

  public async store({ request }: HttpContextContract) {
    const validateData = await request.validate(IndicacaoEspecificaValidator)

    const titulo = validateData.titulo
    const texto = validateData.texto

    const indicacaoEspecifica = await IndicacaoEspecifica.create({
      titulo,
      texto,
    })
    return indicacaoEspecifica
  }

  public async update({ request }: HttpContextContract) {
    const id = request.param('id')
    if (!id) return
    const validatorSchema = schema.create({
      titulo: schema.string.optional({ trim: true }),
      texto: schema.string.optional({ trim: true }),
    })

    const validateData = await request.validate({
      schema: validatorSchema,
      messages: {
        string: 'O campo {{field}} deve ser uma string',
      },
    })
    const indicacaoEspecifica = await IndicacaoEspecifica.findOrFail(id)
    indicacaoEspecifica.merge(limpaCamposNulosDeObjeto(validateData))
    await indicacaoEspecifica.save()

    return indicacaoEspecifica
  }

  public async destroy({ request }: HttpContextContract) {
    const id = request.param('id')
    if (!id) return

    const indicacaoEspecifica = await IndicacaoEspecifica.findOrFail(id)
    await indicacaoEspecifica.delete()

    return indicacaoEspecifica
  }
}
