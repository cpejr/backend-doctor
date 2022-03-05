import { schema } from '@ioc:Adonis/Core/Validator'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export class ReceitaValidatorStore {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    titulo: schema.string({
      trim: true,
    }),
    descricao: schema.string({
      trim: true,
    }),
  })

  public messages = {
    required: 'Digite um(a) {{field}}',
    string: 'O campo {{field}} deve ser uma string',
  }
}
export class ReceitaValidatorUpdate {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    titulo: schema.string.optional({
      trim: true,
    }),
    descricao: schema.string.optional({
      trim: true,
    }),
  })

  public messages = {
    string: 'O campo {{field}} deve ser uma string',
  }
}
