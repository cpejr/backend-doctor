import { schema } from '@ioc:Adonis/Core/Validator'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class FormularioPacienteValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    // respostas: schema.string.optional({ trim: true }),
    midia_url: schema.string.optional({ trim: true }),
    word: schema.string.optional({ trim: true }),
    status: schema.boolean(),
  })

  public messages = {
    required: 'Digite um {{field}}',
    string: 'O campo {{field}} deve ser uma string',
    boolean: 'O campo {{field}} deve ser uma string',
  }
}
