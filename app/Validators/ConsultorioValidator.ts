import { schema } from '@ioc:Adonis/Core/Validator'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export class ConsultorioValidatorStore {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    nome: schema.string({ trim: true }),
    tipo: schema.enum(['CONSULTA', 'EXAME']),
  })

  public messages = {
    required: 'Digite um {{field}}',
    string: 'O campo {{field}} deve ser uma string',
    'enum': 'O campo {{field}} deve ser CONSULTA ou EXAME',
  }
}
export class ConsultorioValidatorUpdate {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    nome: schema.string.optional({ trim: true }),
    tipo: schema.enum.optional(['CONSULTA', 'EXAME']),
  })

  public messages = {
    string: 'O campo {{field}} deve ser uma string',
    'enum': 'O campo {{field}} deve ser CONSULTA ou EXAME',
  }
}
