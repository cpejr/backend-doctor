import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Indicacao from 'App/Models/Indicacao'
import IndicacaosRepository from 'App/Repositories/IndicacaosRepository'
import IndicacaosDTO from 'App/DTO/IndicacaosDTO'
import { limpaCamposNulosDeObjeto } from 'App/Utils/Utils'

export default class IndicacaosController {
  public async index({ request }: HttpContextContract) {
    const indicacaoData = {
      id: request.param('id'),
      texto: request.param('texto'),
    } as IndicacaosDTO
    const indicacaos = await IndicacaosRepository.find(limpaCamposNulosDeObjeto(indicacaoData))
    return indicacaos
  }

  public async store({ request }: HttpContextContract) {
    const texto = request.input('texto')

    const indicacao = await Indicacao.create({
      texto,
    })
    return indicacao
  }

  public async update({ request }: HttpContextContract) {
    const id = request.param('id')
    if (!id) return

    const indicacaoData = {
      id,
      texto: request.input('texto'),
    } as IndicacaosDTO

    const indicacao = await Indicacao.findOrFail(id)
    indicacao.merge(limpaCamposNulosDeObjeto(indicacaoData))
    await indicacao.save()

    return indicacao
  }

  public async destroy({ request }: HttpContextContract) {
    const id = request.param('id')
    if (!id) return

    const indicacao = await Indicacao.findOrFail(id)
    await indicacao.delete()

    return indicacao
  }
}