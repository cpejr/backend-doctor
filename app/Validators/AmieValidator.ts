import { schema } from '@ioc:Adonis/Core/Validator'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class AmieValidator {
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
