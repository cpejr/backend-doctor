import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import ReceitasDTO from 'App/DTO/ReceitasDTO'
import Receita from 'App/Models/Receita'
import ReceitasRepository from 'App/Repositories/ReceitasRepostory'
import { limpaCamposNulosDeObjeto } from 'App/Utils/Utils'

export default class ReceitasController {
  public async index({ request }: HttpContextContract) {
    const receitaData = {
      id: request.param('id'),
      titulo: request.param('titulo'),
      descricao: request.param('descricao'),
      id_usuario: request.param('id_usuario'),
    } as ReceitasDTO
    const receitas = await ReceitasRepository.find(limpaCamposNulosDeObjeto(receitaData))
    return receitas
  }

  public async store({ request }: HttpContextContract) {
    const titulo = request.input('titulo')
    const descricao = request.input('descricao')
    const id_usuario = request.input('id_usuario')

    const receita = await Receita.create({
      titulo,
      descricao,
      id_usuario
    })
    return receita
  }

  public async update({ request }: HttpContextContract) {
    const id = request.param('id')
    if (!id) return

    const receitaData = {
      id,
      titulo: request.input('titulo'),
      descricao: request.input('descricao'),
      id_usuario: request.input('id_usuario'),
    } as ReceitasDTO

    const receita = await Receita.findOrFail(id)
    receita.merge(limpaCamposNulosDeObjeto(receitaData))
    await receita.save()

    return receita
  }

  public async destroy({ request }: HttpContextContract) {
    const id = request.param('id')
    if (!id) return

    const receita = await Receita.findOrFail(id)
    await receita.delete()

    return receita
  }
}
