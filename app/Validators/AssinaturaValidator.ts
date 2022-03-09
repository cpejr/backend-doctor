import { schema } from '@ioc:Adonis/Core/Validator'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export class AssinaturaValidatorStore {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    doc_assinatura: schema.string({ trim: true }),
  })

  public messages = {
    required: 'Digite um {{field}}',
    string: 'O campo {{field}} deve ser uma string',
  }
}
export class AssinaturaValidatorUpdate {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    doc_assinatura: schema.string.optional({ trim: true }),
  })

  public messages = {
    string: 'O campo {{field}} deve ser uma string',
  }
}
