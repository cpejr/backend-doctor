import { schema } from '@ioc:Adonis/Core/Validator'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export class SobreMimValidatorGet {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    id: schema.string.optional({ trim: true }),
    titulo_um: schema.string.optional({ trim: true }),
    id_imagem_um: schema.string.optional({ trim: true }),
    texto_um: schema.string.optional({ trim: true }),
    titulo_dois: schema.string.optional({ trim: true }),
    id_imagem_dois: schema.string.optional({ trim: true }),
    texto_dois: schema.string.optional({ trim: true }),
  })

  public messages = {
    string: 'O campo {{field}} deve ser uma string',
  }
}
export class SobreMimValidatorStore {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    titulo_um: schema.string({ trim: true }),
    imagem_um: schema.file({
      size: '2mb',
      extnames: ["jpg", "gif", "png", "jpeg", "pjpeg"],
    }),
    texto_um: schema.string({ trim: true }),
    titulo_dois: schema.string({ trim: true }),
    imagem_dois: schema.file({
      size: '2mb',
      extnames: ["jpg", "gif", "png", "jpeg", "pjpeg"],
    }),
    texto_dois: schema.string({ trim: true }),
  })

  public messages = {
    required: 'Digite um {{field}}',
    string: 'O campo {{field}} deve ser uma string',
    file: 'O campo {{field}} dever ser um file'
  }
}
export class SobreMimValidatorUpdate {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    titulo_um: schema.string.optional({ trim: true }),
    imagem_um: schema.file.optional({
      size: '2mb',
      extnames: ["jpg", "gif", "png", "jpeg", "pjpeg"],
    }),
    texto_um: schema.string.optional({ trim: true }),
    titulo_dois: schema.string.optional({ trim: true }),
    imagem_dois: schema.file.optional({
      size: '2mb',
      extnames: ["jpg", "gif", "png", "jpeg", "pjpeg"],
    }),
    texto_dois: schema.string.optional({ trim: true }),
  })

  public messages = {
    string: 'O campo {{field}} deve ser uma string',
    file: 'O campo {{field}} dever ser um file'
  }
}
