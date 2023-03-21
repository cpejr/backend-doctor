import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Home from 'App/Models/Home'
import HomesDTO from 'App/DTO/HomesDTO'
import HomesRepository from 'App/Repositories/HomesRepository'
import { limpaCamposNulosDeObjeto } from 'App/Utils/Utils'
import { HomeValidatorStore, HomeValidatorUpdate } from 'App/Validators/HomeValidator'
import ArquivosController from 'App/Controllers/Http/ArquivosController'

export default class HomesController {
  public async index({ request }: HttpContextContract) {
    const homeData = {
      id: request.param('id'),
      video: request.param('video'),
      titulo_um: request.param('titulo_um'),
      texto_um: request.param('texto_um'),
      titulo_dois: request.param('titulo_dois'),
      texto_dois: request.param('texto_dois'),
      titulo_tres: request.param('titulo_tres'),
      texto_tres: request.param('texto_tres'),
      titulo_quatro: request.param('titulo_quatro'),
      texto_quatro: request.param('texto_quatro'),
      imagem_quatro: request.param('imagem_quatro'),
    } as HomesDTO
    const homes = await HomesRepository.find(limpaCamposNulosDeObjeto(homeData))
    return homes
  }

  public async store({ request }: HttpContextContract) {
    const validateData = await request.validate(HomeValidatorStore)

    const video = validateData.video
    const titulo_um = validateData.titulo_um
    const texto_um = validateData.texto_um
    const titulo_dois = validateData.titulo_dois
    const texto_dois = validateData.texto_dois
    const titulo_tres = validateData.titulo_tres
    const texto_tres = validateData.texto_tres
    const titulo_quatro = validateData.titulo_quatro
    const texto_quatro = validateData.texto_quatro
    const imagem_quatro = validateData.imagem_quatro

    const home = await Home.create({
      video,
      titulo_um,
      texto_um,
      titulo_dois,
      texto_dois,
      titulo_tres,
      texto_tres,
      titulo_quatro,
      texto_quatro,
      imagem_quatro,
    })
    return home
  }

  public async update({ request }: HttpContextContract) {
    const id = request.param('id')
    if (!id) return
    const validateData = await request.validate(HomeValidatorUpdate)
    const home = await Home.findOrFail(id)
    home.merge(limpaCamposNulosDeObjeto(validateData))
    await home.save()
    return home
  }

  public async destroy({ request }: HttpContextContract) {
    const id = request.param('id')
    if (!id) return

    const home = await Home.findOrFail(id)
    await home.delete()

    return home
  }

  public async updateImagem({ request }: HttpContextContract) {

    const arquivoscontroller: ArquivosController = new ArquivosController()
    const id = request.param('id')
    if (!id) return
  
    const imagem_especifica = await Home.findOrFail(id);
    if(imagem_especifica.imagem_quatro != undefined && imagem_especifica.imagem_quatro != null && imagem_especifica.imagem_quatro != ""){
      const chave = imagem_especifica.imagem_quatro
      await arquivoscontroller.destroy(chave);
    }
    const file = request.input('file')
    const chave_nova = await arquivoscontroller.store(file)
    imagem_especifica.$attributes.imagem_quatro= chave_nova;
    await imagem_especifica.save()
  
    return id;
  }
}


