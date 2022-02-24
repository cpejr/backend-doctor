import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Assinatura from 'App/Models/Assinatura'
import AssinaturasDTO from 'App/DTO/AssinaturasDTO'
import AssinaturasRepository from 'App/Repositories/AssinaturasRepository'
import { limpaCamposNulosDeObjeto } from 'App/Utils/Utils'

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
    const doc_assinatura = request.input('doc_assinatura')

    const assinatura = await Assinatura.create({
      doc_assinatura,
    })
    return assinatura
  }

  public async update({ request }: HttpContextContract) {
    const id = request.param('id')
    if (!id) return

    const assinaturaData = {
      id,
      doc_assinatura: request.input('doc_assinatura'),
    } as AssinaturasDTO

    const assiantura = await Assinatura.findOrFail(id)
    assiantura.merge(limpaCamposNulosDeObjeto(assinaturaData))
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
