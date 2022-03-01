import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import ImagemCarrossel from 'App/Models/ImagemCarrossel'
import ImagensCarrosselRepository from 'App/Repositories/ImagensCarrosselReposiory'
import ImagensCarrosselDTO from 'App/DTO/ImagensCarrossel'
import { limpaCamposNulosDeObjeto } from 'App/Utils/Utils'

export default class ImagensCarrosselController {
  public async index({ request }: HttpContextContract) {
    const imagemCarrosselData = {
      id: request.param('id'),
      imagem: request.param('imagem')
    } as ImagensCarrosselDTO
    const imagensCarrossel = await ImagensCarrosselRepository.find(limpaCamposNulosDeObjeto(imagemCarrosselData))
    return imagensCarrossel
  }

  public async store({ request }: HttpContextContract) {
    const imagem = request.input('imagem')

    const imagemCarrossel = await ImagemCarrossel.create({
      imagem,
    })
    return imagemCarrossel
  }

  public async update({ request }: HttpContextContract) {
    const id = request.param('id')
    if (!id) return

    const imagemCarrosselData = {
      id,
      imagem: request.input('imagem')
    } as ImagensCarrosselDTO

    const imagemCarrossel = await ImagemCarrossel.findOrFail(id)
    imagemCarrossel.merge(limpaCamposNulosDeObjeto(imagemCarrosselData))
    await imagemCarrossel.save()

    return imagemCarrossel
  }
  public async destroy({ request }: HttpContextContract) {
    const id = request.param('id')
    if (!id) return

    const imagemCarrossel = await ImagemCarrossel.findOrFail(id)
    await imagemCarrossel.delete()

    return imagemCarrossel
  }
}
