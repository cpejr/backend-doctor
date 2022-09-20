import { schema } from '@ioc:Adonis/Core/Validator'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export class FormularioPacienteValidatorStore {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    respostas: schema.object.optional().anyMembers(),
    midia_url: schema.string.optional({ trim: true }),
    word: schema.string.optional({ trim: true }),
    status: schema.boolean(),
    notificacao_ativa: schema.boolean(),
  })

  public messages = {
    required: 'Digite um {{field}}',
    string: 'O campo {{field}} deve ser uma string',
    boolean: 'O campo {{field}} deve ser uma string',
  }
}

export class FormularioPacienteValidatorUpdate {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    respostas: schema.object.optional().anyMembers(),
    midia_url: schema.string.optional({ trim: true }),
    word: schema.string.optional({ trim: true }),
    status: schema.boolean.optional(),
    notificacao_ativa: schema.boolean.optional(),
  })

  public messages = {
    string: 'O campo {{field}} deve ser uma string',
    boolean: 'O campo {{field}} deve ser uma string',
  }
}
