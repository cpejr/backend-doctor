import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Amie from 'App/Models/Amie'
import AmiesDTO from 'App/DTO/AmiesDTO'
import AmiesRepository from 'App/Repositories/AmiesRepository'
import { limpaCamposNulosDeObjeto } from 'App/Utils/Utils'

export default class AmiesController {
  public async index({ request }: HttpContextContract) {
    const amieData = {
      id: request.param('id'),
      imagem_um: request.param('imagem_um'),
      texto: request.param('texto'),
      imagem_dois: request.param('imagem_dois'),

    } as AmiesDTO
    const amies = await AmiesRepository.find(limpaCamposNulosDeObjeto(amieData))
    return amies
  }

  public async store({ request }: HttpContextContract) {
    const imagem_um = request.input('imagem_um')
    const texto = request.input('texto')
    const imagem_dois = request.input('imagem_dois')

    const amie = await Amie.create({
        imagem_um,
        texto,
        imagem_dois
    })
    return amie
  }

  public async update({ request }: HttpContextContract) {
    const id = request.param('id')
    if (!id) return

    const amieData = {
      id,
      imagem_um: request.input('imagem_um'),
      texto: request.input('texto'),
      imagem_dois: request.input('imagem_dois'),
    } as AmiesDTO

    const amie = await Amie.findOrFail(id)
    amie.merge(limpaCamposNulosDeObjeto(amieData))
    await amie.save()

    return amie
  }

  public async destroy({ request }: HttpContextContract) {
    const id = request.param('id')
    if (!id) return

    const amie = await Amie.findOrFail(id)
    await amie.delete()

    return amie
  }
}
