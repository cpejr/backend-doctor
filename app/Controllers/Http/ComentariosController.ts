import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Comentario from 'App/Models/Comentario'
import ComentariosDTO from 'App/DTO/ComentariosDTO'
import ComentariosRepository from 'App/Repositories/ComentariosRepository'
import { limpaCamposNulosDeObjeto } from 'App/Utils/Utils'

export default class ComentariosController {
  public async index({ request }: HttpContextContract) {
    const comentarioData = {
      id: request.param('id'),
      comentario: request.param('comentario'),
    } as ComentariosDTO
    const comentarios = await ComentariosRepository.find(limpaCamposNulosDeObjeto(comentarioData))
    return comentarios
  }

  public async store({ request }: HttpContextContract) {
    const comentario = request.input('comentario')

    const comentarios = await Comentario.create({
      comentario,
    })
    return comentarios
  }

  public async update({ request }: HttpContextContract) {
    const id = request.param('id')
    if (!id) return

    const comentarioData = {
      id,
      comentario: request.input('comentario'),
    } as ComentariosDTO

    const comentarios = await Comentario.findOrFail(id)
    comentarios.merge(limpaCamposNulosDeObjeto(comentarioData))
    await comentarios.save()

    return comentarios
  }

  public async destroy({ request }: HttpContextContract) {
    const id = request.param('id')
    if (!id) return

    const comentario = await Comentario.findOrFail(id)
    await comentario.delete()

    return comentario
  }
}
