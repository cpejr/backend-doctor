import { schema } from '@ioc:Adonis/Core/Validator'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export class ConversaValidatorStore {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    id_criador: schema.string({ trim: true }),
    id_receptor: schema.string({ trim: true }),
    tipo: schema.enum.optional(['EXAME']),
  })

  public messages = {
    required: 'Digite um {{field}}',
    string: 'O campo {{field}} deve ser uma string',
  }
}
export class ConversaValidatorUpdate {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    ativada: schema.boolean(),
  })

  public messages = {
    boolean: 'O campo {{field}} deve ser uma boleano',
  }
}
