import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import DispositivosRepository from 'App/Repositories/Dispositivos.Repository'
import DispositivosDTO from 'App/DTO/Dispositivos.DTO'
import Dispositivo from 'App/Models/Dispositivo'
import { limpaCamposNulosDeObjeto } from 'App/Utils/Utils'
import { DispositivoValidatorStore, DispositivoValidatorUpdate } from 'App/Validators/DispositivoValidator'

export default class DispositivosController {
  public async index({ request }: HttpContextContract) {
    const dispositivoData = {
      id: request.param('id'),
      titulo: request.param('titulo'),
      esta_disponivel: request.param('esta_disponivel'),
    } as DispositivosDTO
    const dispositivos = await DispositivosRepository.find(
      limpaCamposNulosDeObjeto(dispositivoData)
    )
    return dispositivos
  }

  public async store({ request }: HttpContextContract) {
    const validateData = await request.validate(DispositivoValidatorStore)

    const titulo = validateData.titulo
    const esta_disponivel = validateData.esta_disponivel

    const dispositivo = await Dispositivo.create({
      titulo,
      esta_disponivel,
    })
    return dispositivo
  }

  public async update({ request }: HttpContextContract) {
    const id = request.param('id')
    if (!id) return

    const validateData = await request.validate(DispositivoValidatorUpdate)

    const dispositivo = await Dispositivo.findOrFail(id)
    dispositivo.merge(limpaCamposNulosDeObjeto(validateData))
    await dispositivo.save()

    return dispositivo
  }

  public async destroy({ request }: HttpContextContract) {
    const id = request.param('id')
    if (!id) return

    const dispositivo = await Dispositivo.findOrFail(id)
    await dispositivo.delete()

    return dispositivo
  }
}
