import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Formulario from 'App/Models/Formulario'
import FormulariosDTO from 'App/DTO/FormulariosDTO'
import FormulariosRepository from 'App/Repositories/FormulariosRepository'
import { limpaCamposNulosDeObjeto } from 'App/Utils/Utils'
import FormularioValidator from 'App/Validators/FormularioValidator'
import { schema, rules } from '@ioc:Adonis/Core/Validator'

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

    const validatorSchema = schema.create({
      titulo: schema.string.optional({
        trim: true,
      }),
      tipo: schema.string.optional({
        trim: true,
      }),
      finalidade: schema.string.optional({
        trim: true,
      }),
      urgencia: schema.number.optional([
        rules.range(1, 3)]),
    })

    const validateData = await request.validate({
      schema: validatorSchema,
      messages: {
        'urgencia.range': 'Insira estrelas de 1 a 3',
        string: 'O campo {{field}} deve ser uma string',
        number: 'O campo {{field}} deve ser um inteiro',
        enum: '{{ field }} deve ser {{ options.choices }}',
      },
    })

    const formulario = await Formulario.findOrFail(id)
    formulario.merge(limpaCamposNulosDeObjeto(validateData))
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
