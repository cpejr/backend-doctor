import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import IndicacoesEspecificasDTO from 'App/DTO/IndicacoesEspecificasDTO'
import IndicacoesEspecificasRepository from 'App/Repositories/IndicacoesEspecificasRepository'
import { limpaCamposNulosDeObjeto } from 'App/Utils/Utils'
import IndicacaoEspecifica from 'App/Models/IndicacaoEspecifica'


export default class IndicacaoEspecificasController {
  public async index({ request }: HttpContextContract) {
    const indicacaoEspecificaData = {
      id: request.param('id'),
      titulo: request.param('titulo'),
      texto: request.param('texto'),
    } as IndicacoesEspecificasDTO
    const indicacoesEspecificas = await IndicacoesEspecificasRepository.find(limpaCamposNulosDeObjeto(indicacaoEspecificaData))
    return indicacoesEspecificas
  }

  public async store({ request }: HttpContextContract) {
    const titulo = request.input('titulo')
    const texto = request.input('texto')

    const indicacaoEspecifica = await IndicacaoEspecifica.create({
      titulo,
      texto,
    })
    return indicacaoEspecifica
  }

  public async update({ request }: HttpContextContract) {
    const id = request.param('id')
    if (!id) return

    const indicacaoEspecificaData = {
      id,
      titulo: request.input('titulo'),
      texto: request.input('texto')
    } as IndicacoesEspecificasDTO

    const indicacaoEspecifica = await IndicacaoEspecifica.findOrFail(id)
    indicacaoEspecifica.merge(limpaCamposNulosDeObjeto(indicacaoEspecificaData))
    await indicacaoEspecifica.save()

    return indicacaoEspecifica
  }

  public async destroy({ request }: HttpContextContract) {
    const id = request.param('id')
    if (!id) return

    const indicacaoEspecifica = await IndicacaoEspecifica.findOrFail(id)
    await indicacaoEspecifica.delete()

    return indicacaoEspecifica
  }
}
