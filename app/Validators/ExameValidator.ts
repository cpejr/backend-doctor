import { schema } from '@ioc:Adonis/Core/Validator'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export class ExameValidatorStore {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    titulo: schema.string({
      trim: true,
    }),
    texto: schema.string({
      trim: true,
    }),
  })

  public messages = {
    required: 'Digite um {{field}}',
    string: 'O campo {{field}} deve ser uma string'
  }
}
export class ExameValidatorUpdate {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    titulo: schema.string.optional({
      trim: true,
    }),
    texto: schema.string.optional({
      trim: true,
    }),
  })

  public messages = {
    string: 'O campo {{field}} deve ser uma string'
  }
}
