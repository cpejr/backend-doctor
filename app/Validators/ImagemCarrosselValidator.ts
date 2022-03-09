import { schema } from '@ioc:Adonis/Core/Validator'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export class ImagemCarroselValidatorStore {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    imagem: schema.string({ trim: true }),
  })

  public messages = {
    required: 'Digite um {{field}}',
    string: 'O campo {{field}} deve ser uma string',
  }
}

export class ImagemCarroselValidatorUpdate {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    imagem: schema.string.optional({ trim: true }),
  })

  public messages = {
    string: 'O campo {{field}} deve ser uma string',
  }
}
