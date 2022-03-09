import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Assinatura from 'App/Models/Assinatura'
import AssinaturasDTO from 'App/DTO/AssinaturasDTO'
import AssinaturasRepository from 'App/Repositories/AssinaturasRepository'
import { limpaCamposNulosDeObjeto } from 'App/Utils/Utils'
import {
  AssinaturaValidatorStore,
  AssinaturaValidatorUpdate,
} from 'App/Validators/AssinaturaValidator'
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
    const validateData = await request.validate(AssinaturaValidatorStore)

    const doc_assinatura = validateData.doc_assinatura

    const assinatura = await Assinatura.create({
      doc_assinatura,
    })
    return assinatura
  }

  public async update({ request }: HttpContextContract) {
    const id = request.param('id')
    if (!id) return

    const validateData = await request.validate(AssinaturaValidatorUpdate)

    const assinatura = await Assinatura.findOrFail(id)
    assinatura.merge(limpaCamposNulosDeObjeto(validateData))
    await assinatura.save()

    return assinatura
  }

  public async destroy({ request }: HttpContextContract) {
    const id = request.param('id')
    if (!id) return

    const assinatura = await Assinatura.findOrFail(id)
    await assinatura.delete()

    return assinatura
  }
}
