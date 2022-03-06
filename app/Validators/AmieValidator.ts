import { schema } from '@ioc:Adonis/Core/Validator'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export class AmieValidatorStore {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    imagem_um: schema.string({ trim: true }),
    texto: schema.string({ trim: true }),
    imagem_dois: schema.string({ trim: true }),
  })

  public messages = {
    required: 'Digite um {{field}}',
    string: 'O campo {{field}} deve ser uma string',
  }
}
export class AmieValidatorUpdate {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    imagem_um: schema.string.optional({ trim: true }),
    texto: schema.string.optional({ trim: true }),
    imagem_dois: schema.string.optional({ trim: true }),
  })

  public messages = {
    string: 'O campo {{field}} deve ser uma string',
  }
}
