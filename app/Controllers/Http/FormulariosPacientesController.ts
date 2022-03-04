import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import FormularioPaciente from 'App/Models/FormularioPaciente'
import FormulariosPacientesDTO from 'App/DTO/FormulariosPacientesDTO'
import FormulariosPacientesRepository from 'App/Repositories/FormulariosPacientesRepository'
import { limpaCamposNulosDeObjeto } from 'App/Utils/Utils'
import FormularioPacienteValidator from 'App/Validators/FormularioPacienteValidator'
import { schema } from '@ioc:Adonis/Core/Validator'
export default class FormulariosPacientesController {
  public async index({ request }: HttpContextContract) {
    const formularioPacienteData = {
      id: request.param('id'),
      respostas: request.param('respostas'),
      midia_url: request.param('midia_url'),
      word: request.param('word'),
      status: request.param('status'),
      id_usuario: request.param('id_usuario'),
      id_formulario: request.param('id_formulario'),
    } as FormulariosPacientesDTO
    const formulariosPacientes = await FormulariosPacientesRepository.find(
      limpaCamposNulosDeObjeto(formularioPacienteData)
    )
    return formulariosPacientes
  }

  public async store({ request }: HttpContextContract) {
    const validateData = await request.validate(FormularioPacienteValidator)

    const respostas = request.input('respostas')
    const midia_url = validateData.midia_url
    const word = validateData.word
    const status = validateData.status
    const id_usuario = request.input('id_usuario')
    const id_formulario = request.input('id_formulario')

    const formularioPaciente = await FormularioPaciente.create({
      respostas,
      midia_url,
      word,
      status,
      id_usuario,
      id_formulario,
    })
    return formularioPaciente
  }

  public async update({ request }: HttpContextContract) {
    const id = request.param('id')
    if (!id) return

    const validatorSchema = schema.create({
      midia_url: schema.string.optional({ trim: true }),
      word: schema.string.optional({ trim: true }),
      status: schema.boolean.optional(),
    })

    const validateData = await request.validate({
      schema: validatorSchema,
      messages: {
        string: 'O campo {{field}} deve ser uma string',
        boolean: 'O campo {{field}} deve ser uma string',
      },
    })

    const formularioPaciente = await FormularioPaciente.findOrFail(id)
    formularioPaciente.merge(limpaCamposNulosDeObjeto(validateData))
    await formularioPaciente.save()

    return formularioPaciente
  }

  public async destroy({ request }: HttpContextContract) {
    const id = request.param('id')
    if (!id) return

    const formularioPaciente = await FormularioPaciente.findOrFail(id)
    await formularioPaciente.delete()

    return formularioPaciente
  }
}
