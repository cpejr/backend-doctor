import { schema } from '@ioc:Adonis/Core/Validator'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export class DispositivoValidatorStore {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    titulo: schema.string({ trim: true }),
    esta_disponivel: schema.boolean(),
  })

  public messages = {
    required: 'Digite um {{field}}',
    string: 'O campo {{field}} deve ser uma string',
    boolean: 'O campo {{field}} deve ser uma boleano',
  }
}
export class DispositivoValidatorUpdate {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    titulo: schema.string.optional({ trim: true }),
    esta_disponivel: schema.boolean.optional(),
  })

  public messages = {
    string: 'O campo {{field}} deve ser uma string',
    boolean: 'O campo {{field}} deve ser uma boleano',
  }
}
