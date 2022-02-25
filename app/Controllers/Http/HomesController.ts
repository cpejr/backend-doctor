import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Home from 'App/Models/Home'
import HomesDTO from 'App/DTO/HomesDTO'
import HomesRepository from 'App/Repositories/HomesRepository'
import { limpaCamposNulosDeObjeto } from 'App/Utils/Utils'

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
    const video = request.input('video')
    const titulo_um = request.input('titulo_um')
    const texto_um = request.input('texto_um')
    const titulo_dois = request.input('titulo_dois')
    const texto_dois = request.input('texto_dois')
    const titulo_tres = request.input('titulo_tres')
    const texto_tres = request.input('texto_tres')
    const titulo_quatro = request.input('titulo_quatro')
    const texto_quatro = request.input('texto_quatro')
    const imagem_quatro = request.input('titulo_quatro')

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

    const homeData = {
      id,
      video: request.input('video'),
      titulo_um: request.input('titulo_um'),
      texto_um: request.input('texto_um'),
      titulo_dois: request.input('titulo_dois'),
      texto_dois: request.input('texto_dois'),
      titulo_tres: request.input('titulo_tres'),
      texto_tres: request.input('texto_tres'),
      titulo_quatro: request.input('titulo_quatro'),
      texto_quatro: request.input('texto_quatro'),
      imagem_quatro: request.input('imagem_quatro'),
    } as HomesDTO

    const home = await Home.findOrFail(id)
    home.merge(limpaCamposNulosDeObjeto(homeData))
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
}
