import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import SobreMim from 'App/Models/SobreMim'
import SobreMimsDTO from 'App/DTO/SobreMimsDTO'
import SobreMimsRepository from 'App/Repositories/SobreMimsRepository'
import { limpaCamposNulosDeObjeto } from 'App/Utils/Utils'
import { schema } from '@ioc:Adonis/Core/Validator'
import { SobreMimValidatorStore, SobreMimValidatorUpdate } from 'App/Validators/SobreMimValidator'

export default class SobreMimsController {
  public async index({ request }: HttpContextContract) {
    const sobreMimData = {
      id: request.param('id'),
      imagem_um: request.param('imagem_um'),
      titulo_um: request.param('titulo_um'),
      texto_um: request.param('texto_um'),
      imagem_dois: request.param('imagem_dois'),
      titulo_dois: request.param('titulo_dois'),
      texto_dois: request.param('texto_dois'),
    } as SobreMimsDTO
    const sobreMim = await SobreMimsRepository.find(limpaCamposNulosDeObjeto(sobreMimData))
    return sobreMim
  }

  public async store({ request }: HttpContextContract) {
    const validateData = await request.validate(SobreMimValidatorStore)

    const imagem_um = validateData.imagem_um
    const titulo_um = validateData.titulo_um
    const texto_um = validateData.texto_um
    const imagem_dois = validateData.imagem_dois
    const titulo_dois = validateData.titulo_dois
    const texto_dois = validateData.texto_dois

    const SobreMims = await SobreMim.create({
      imagem_um,
      titulo_um,
      texto_um,
      imagem_dois,
      titulo_dois,
      texto_dois,
    })
    return SobreMims
  }

  public async update({ request }: HttpContextContract) {
    const id = request.param('id')
    if (!id) return

    const validateData = await request.validate(SobreMimValidatorUpdate)

    const SobreMims = await SobreMim.findOrFail(id)
    SobreMims.merge(limpaCamposNulosDeObjeto(validateData))
    await SobreMims.save()

    return SobreMims
  }

  public async destroy({ request }: HttpContextContract) {
    const id = request.param('id')
    if (!id) return

    const SobreMims = await SobreMim.findOrFail(id)
    await SobreMims.delete()

    return SobreMims
  }
}
