import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Assinatura from 'App/Models/Assinatura'
import AssinaturasDTO from 'App/DTO/AssinaturasDTO'
import AssinaturasRepository from 'App/Repositories/AssinaturasRepository'
import { limpaCamposNulosDeObjeto } from 'App/Utils/Utils'
import AssinaturaValidator from 'App/Validators/AssinaturaValidator'
import { schema } from '@ioc:Adonis/Core/Validator'

export default class AssinaturasController {
  public async index({ request }: HttpContextContract) {
    const assinaturaData = {
      id: request.param('id'),
      doc_assinatura: request.param('doc_assinatura'),
    } as AssinaturasDTO
    const assinaturas = await AssinaturasRepository.find(limpaCamposNulosDeObjeto(assinaturaData))
    return assinaturas
  }

  public async store({ request }: HttpContextContract) {
    const validateData = await request.validate(AssinaturaValidator)

    const doc_assinatura = validateData.doc_assinatura

    const assinatura = await Assinatura.create({
      doc_assinatura,
    })
    return assinatura
  }

  public async update({ request }: HttpContextContract) {
    const id = request.param('id')
    if (!id) return

    const validatorSchema = schema.create({
      doc_assinatura: schema.string.optional({ trim: true }),
    })

    const validateData = await request.validate({
      schema: validatorSchema,
      messages: {
        string: 'O campo {{field}} deve ser uma string',
      },
    })

    const assiantura = await Assinatura.findOrFail(id)
    assiantura.merge(limpaCamposNulosDeObjeto(validateData))
    await assiantura.save()

    return assiantura
  }

  public async destroy({ request }: HttpContextContract) {
    const id = request.param('id')
    if (!id) return

    const assiantura = await Assinatura.findOrFail(id)
    await assiantura.delete()

    return assiantura
  }
}
