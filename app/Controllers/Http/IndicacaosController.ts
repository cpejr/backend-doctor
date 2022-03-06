import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Indicacao from 'App/Models/Indicacao'
import IndicacaosRepository from 'App/Repositories/IndicacaosRepository'
import IndicacaosDTO from 'App/DTO/IndicacaosDTO'
import { limpaCamposNulosDeObjeto } from 'App/Utils/Utils'
import { schema } from '@ioc:Adonis/Core/Validator'
import { IndicacaoValidatorStore, IndicacaoValidatorUpdate } from 'App/Validators/IndicacaoValidator'
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
    const validateData = await request.validate(IndicacaoValidatorStore)

    const texto = validateData.texto

    const indicacao = await Indicacao.create({
      texto,
    })
    return indicacao
  }

  public async update({ request }: HttpContextContract) {
    const id = request.param('id')
    if (!id) return

    const validateData = await request.validate(IndicacaoValidatorUpdate)

    const indicacao = await Indicacao.findOrFail(id)
    indicacao.merge(limpaCamposNulosDeObjeto(validateData))
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
