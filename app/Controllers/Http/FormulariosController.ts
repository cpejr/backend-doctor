import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Formulario from 'App/Models/Formulario'
import FormulariosDTO from 'App/DTO/FormulariosDTO'
import FormulariosRepository from 'App/Repositories/FormulariosRepository'
import { limpaCamposNulosDeObjeto } from 'App/Utils/Utils'
import FormularioValidator from 'App/Validators/FormularioValidator'

export default class FormulariosController {
  public async index({ request }: HttpContextContract) {
    const formularioData = {
      id: request.param('id'),
      titulo: request.param('titulo'),
      tipo: request.param('tipo'),
      finalidade: request.param('finalidade'),
      perguntas: request.param('perguntas'),
      urgencia: request.param('urgencia'),
    } as FormulariosDTO
    const formularios = await FormulariosRepository.find(limpaCamposNulosDeObjeto(formularioData))
    return formularios
  }

  public async store({ request }: HttpContextContract) {
    const validateData = await request.validate(FormularioValidator)

    const titulo = validateData.titulo
    const tipo = validateData.tipo
    const finalidade = validateData.finalidade
    const perguntas = request.input('perguntas')
    const urgencia = validateData.urgencia

    const formulario = await Formulario.create({
      titulo,
      tipo,
      finalidade,
      perguntas,
      urgencia,
    })
    return formulario
  }

  public async update({ request }: HttpContextContract) {
    const id = request.param('id')
    if (!id) return

    const formularioData = {
      id,
      titulo: request.input('titulo'),
      tipo: request.input('tipo'),
      finalidade: request.input('finalidade'),
      perguntas: request.input('perguntas'),
      urgencia: request.input('urgencia'),
    } as FormulariosDTO

    const formulario = await Formulario.findOrFail(id)
    formulario.merge(limpaCamposNulosDeObjeto(formularioData))
    await formulario.save()

    return formulario
  }

  public async destroy({ request }: HttpContextContract) {
    const id = request.param('id')
    if (!id) return

    const formulario = await Formulario.findOrFail(id)
    await formulario.delete()

    return formulario
  }
}
