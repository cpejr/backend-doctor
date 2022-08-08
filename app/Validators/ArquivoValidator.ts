import { schema } from '@ioc:Adonis/Core/Validator'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class ArquivoValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    banner: schema.file({
      size: '2mb',
      extnames: ['jpg', 'gif', 'png']
    })
  })

  public messages = {}
}
