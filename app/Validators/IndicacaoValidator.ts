import { schema } from '@ioc:Adonis/Core/Validator'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class IndicacaoValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    texto: schema.string({ trim: true }),
  })

  public messages = {
    string: 'O campo {{field}} deve ser uma string',
  }
}
