import { schema } from '@ioc:Adonis/Core/Validator'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export class SobreMimValidatorStore {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    imagem_um: schema.string({ trim: true }),
    titulo_um: schema.string({ trim: true }),
    texto_um: schema.string({ trim: true }),
    imagem_dois: schema.string({ trim: true }),
    titulo_dois: schema.string({ trim: true }),
    texto_dois: schema.string({ trim: true }),
  })

  public messages = {
    required: 'Digite um {{field}}',
    string: 'O campo {{field}} deve ser uma string',
  }
  
}

export class SobreMimValidatorUpdate {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    imagem_um: schema.string.optional({ trim: true }),
    titulo_um: schema.string.optional({ trim: true }),
    texto_um: schema.string.optional({ trim: true }),
    imagem_dois: schema.string.optional({ trim: true }),
    titulo_dois: schema.string.optional({ trim: true }),
    texto_dois: schema.string.optional({ trim: true }),
  })

  public messages = {
    string: 'O campo {{field}} deve ser uma string',
  }
  
}
