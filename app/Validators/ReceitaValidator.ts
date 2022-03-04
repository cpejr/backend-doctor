import { schema } from '@ioc:Adonis/Core/Validator'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class ReceitaValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    titulo: schema.string({
      trim: true,
    }),
    descricao: schema.string({
      trim: true,
    }),
  })

   public messages = {
    required: 'Digite um(a) {{field}}',
    string: 'O campo {{field}} deve ser uma string'
  }
}
