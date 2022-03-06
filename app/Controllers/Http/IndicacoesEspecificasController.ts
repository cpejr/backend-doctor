import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import IndicacoesEspecificasDTO from 'App/DTO/IndicacoesEspecificasDTO'
import IndicacoesEspecificasRepository from 'App/Repositories/IndicacoesEspecificasRepository'
import { limpaCamposNulosDeObjeto } from 'App/Utils/Utils'
import IndicacaoEspecifica from 'App/Models/IndicacaoEspecifica'
import { IndicacaoEspecificaValidatorStore, IndicacaoEspecificaValidatorUpdate } from 'App/Validators/IndicacaoEspecificaValidator'

export default class IndicacaoEspecificasController {
  public async index({ request }: HttpContextContract) {
    const indicacaoEspecificaData = {
      id: request.param('id'),
      titulo: request.param('titulo'),
      texto: request.param('texto'),
    } as IndicacoesEspecificasDTO
    const indicacoesEspecificas = await IndicacoesEspecificasRepository.find(
      limpaCamposNulosDeObjeto(indicacaoEspecificaData)
    )
    return indicacoesEspecificas
  }

  public async store({ request }: HttpContextContract) {
    const validateData = await request.validate(IndicacaoEspecificaValidatorStore)

    const titulo = validateData.titulo
    const texto = validateData.texto

    const indicacaoEspecifica = await IndicacaoEspecifica.create({
      titulo,
      texto,
    })
    return indicacaoEspecifica
  }

  public async update({ request }: HttpContextContract) {
    const id = request.param('id')
    if (!id) return
    
    const validateData = await request.validate(IndicacaoEspecificaValidatorUpdate)

    const indicacaoEspecifica = await IndicacaoEspecifica.findOrFail(id)
    indicacaoEspecifica.merge(limpaCamposNulosDeObjeto(validateData))
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
