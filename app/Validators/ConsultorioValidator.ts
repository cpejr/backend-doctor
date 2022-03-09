import { schema } from '@ioc:Adonis/Core/Validator'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export class ConsultorioValidatorStore {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    nome: schema.string({ trim: true }),
  })

  public messages = {
    required: 'Digite um {{field}}',
    string: 'O campo {{field}} deve ser uma string',
  }
}
export class ConsultorioValidatorUpdate {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    nome: schema.string.optional({ trim: true }),
  })

  public messages = {
    string: 'O campo {{field}} deve ser uma string',
  }
}
