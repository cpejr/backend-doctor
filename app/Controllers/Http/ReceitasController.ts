import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import ReceitasDTO from 'App/DTO/ReceitasDTO'
import Receita from 'App/Models/Receita'
import ReceitasRepository from 'App/Repositories/ReceitasRepostory'
import { limpaCamposNulosDeObjeto } from 'App/Utils/Utils'
import { ReceitaValidatorStore, ReceitaValidatorUpdate } from 'App/Validators/ReceitaValidator'

export default class ReceitasController {
  public async index({ request }: HttpContextContract) {
    const receitaData = {
      id: request.param('id'),
      titulo: request.param('titulo'),
      descricao: request.param('descricao'),
      pdf_url: request.param('pdf_url'),
      id_usuario: request.param('id_usuario'),
    } as ReceitasDTO
    const receitas = await ReceitasRepository.find(limpaCamposNulosDeObjeto(receitaData))
    return receitas
  }

  public async indexByIdUsuario({ request }: HttpContextContract) {
    const receitasData = {
      id_usuario: request.param('id_usuario'),
    } as ReceitasDTO

    const receitas = await ReceitasRepository.find(receitasData)

    return receitas
  }

  public async indexById({ request }: HttpContextContract) {
    const id = request.param('id')
    if (!id) return

    const receitas = await Receita.findOrFail(id)

    return receitas
  }

  public async store({ request }: HttpContextContract) {
    const validateData = await request.validate(ReceitaValidatorStore)

    const titulo = validateData.titulo
    const descricao = validateData.descricao
    const pdf_url = validateData.pdf_url
    const id_usuario = request.input('id_usuario')

    const receita = await Receita.create({
      titulo,
      descricao,
      pdf_url,
      id_usuario,
    })
    return receita
  }

  public async update({ request }: HttpContextContract) {
    const id = request.param('id')
    if (!id) return

    const validateData = await request.validate(ReceitaValidatorUpdate)

    const receita = await Receita.findOrFail(id)
    receita.merge(limpaCamposNulosDeObjeto(validateData))
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
