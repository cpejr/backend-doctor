import { schema } from '@ioc:Adonis/Core/Validator'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export class HomeValidatorStore {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    video: schema.string({ trim: true }),
    titulo_um: schema.string({ trim: true }),
    texto_um: schema.string({ trim: true }),
    titulo_dois: schema.string({ trim: true }),
    texto_dois: schema.string({ trim: true }),
    titulo_tres: schema.string({ trim: true }),
    texto_tres: schema.string({ trim: true }),
    titulo_quatro: schema.string({ trim: true }),
    texto_quatro: schema.string({ trim: true }),
    imagem_quatro: schema.string({ trim: true }),
  })

  public messages = {
    required: 'Digite um {{field}}',
    string: 'O campo {{field}} deve ser uma string',
  }
}
export class HomeValidatorUpdate {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    video: schema.string.optional({ trim: true }),
    titulo_um: schema.string.optional({ trim: true }),
    texto_um: schema.string.optional({ trim: true }),
    titulo_dois: schema.string.optional({ trim: true }),
    texto_dois: schema.string.optional({ trim: true }),
    titulo_tres: schema.string.optional({ trim: true }),
    texto_tres: schema.string.optional({ trim: true }),
    titulo_quatro: schema.string.optional({ trim: true }),
    texto_quatro: schema.string.optional({ trim: true }),
    imagem_quatro: schema.string.optional({ trim: true }),
  })

  public messages = {
    string: 'O campo {{field}} deve ser uma string',
  }
}
