import { schema } from '@ioc:Adonis/Core/Validator'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export class IndicacaoValidatorStore {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    texto: schema.string({ trim: true }),
  })

  public messages = {
    required: 'Digite um {{field}}',
    string: 'O campo {{field}} deve ser uma string',
  }
}

export class IndicacaoValidatorUpdate {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    texto: schema.string.optional({ trim: true }),
  })

  public messages = {
    string: 'O campo {{field}} deve ser uma string',
  }
}
