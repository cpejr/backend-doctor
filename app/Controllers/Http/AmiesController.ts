import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Amie from 'App/Models/Amie'
import AmiesDTO from 'App/DTO/AmiesDTO'
import AmiesRepository from 'App/Repositories/AmiesRepository'
import { limpaCamposNulosDeObjeto } from 'App/Utils/Utils'
import { AmieValidatorStore, AmieValidatorUpdate } from 'App/Validators/AmieValidator'

export default class AmiesController {
  public async index({ request }: HttpContextContract) {
    const amieData = {
      id: request.param('id'),
      imagem_um: request.param('imagem_um'),
      texto: request.param('texto'),
      imagem_dois: request.param('imagem_dois'),
    } as AmiesDTO
    const amies = await AmiesRepository.find(limpaCamposNulosDeObjeto(amieData))
    return amies
  }

  public async store({ request }: HttpContextContract) {
    const validateData = await request.validate(AmieValidatorStore)

    const imagem_um = validateData.imagem_um
    const texto = validateData.texto
    const imagem_dois = validateData.imagem_dois

    const amie = await Amie.create({
      imagem_um,
      texto,
      imagem_dois,
    })
    return amie
  }

  public async update({ request }: HttpContextContract) {
    const id = request.param('id')
    if (!id) return

    const validateData = await request.validate(AmieValidatorUpdate)
    
    const amie = await Amie.findOrFail(id)
    amie.merge(limpaCamposNulosDeObjeto(validateData))
    await amie.save()

    return amie
  }

  public async destroy({ request }: HttpContextContract) {
    const id = request.param('id')
    if (!id) return

    const amie = await Amie.findOrFail(id)
    await amie.delete()

    return amie
  }
}
