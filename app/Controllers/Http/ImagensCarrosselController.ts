import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import ImagemCarrossel from 'App/Models/ImagemCarrossel'
import ImagensCarrosselRepository from 'App/Repositories/ImagensCarrosselReposiory'
import ImagensCarrosselDTO from 'App/DTO/ImagensCarrossel'
import { limpaCamposNulosDeObjeto } from 'App/Utils/Utils'
import { ImagemCarroselValidatorStore, ImagemCarroselValidatorUpdate } from 'App/Validators/ImagemCarrosselValidator'
import ArquivosController from 'App/Controllers/Http/ArquivosController'

export default class ImagensCarrosselController {
  public async index({ request }: HttpContextContract) {
    const imagemCarrosselData = {
      id: request.param('id'),
      imagem: request.param('imagem'),
    } as ImagensCarrosselDTO
    const imagensCarrossel = await ImagensCarrosselRepository.find(
      limpaCamposNulosDeObjeto(imagemCarrosselData)
    )
    return imagensCarrossel
  }

  public async store({ request }: HttpContextContract) {
    const validateData = await request.validate(ImagemCarroselValidatorStore)

    const imagem = validateData.imagem

    const imagemCarrossel = await ImagemCarrossel.create({
      imagem,
    })
    return imagemCarrossel
  }

  public async update({ request }: HttpContextContract) {
    const id = request.param('id')
    if (!id) return

    const validateData = await request.validate(ImagemCarroselValidatorUpdate)
    
    const imagemCarrossel = await ImagemCarrossel.findOrFail(id)
    imagemCarrossel.merge(limpaCamposNulosDeObjeto(validateData))
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

  public async updateImagem({ request }: HttpContextContract) {

    const arquivoscontroller: ArquivosController = new ArquivosController()
    const url = request.param('url')
    arquivoscontroller.destroy(url)
    
    const id = request.param('id')
    if (!id) return

    const imagem_especifica = await ImagemCarrossel.findOrFail(id);

    const file = request.input('file')
    const res = await arquivoscontroller.store(file)
    imagem_especifica.$attributes.imagem = res
    await imagem_especifica.save()
  }
}
