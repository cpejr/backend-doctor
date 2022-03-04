import { schema, rules } from '@ioc:Adonis/Core/Validator'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export class FormularioValidatorStore {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    titulo: schema.string({ trim: true }),
    tipo: schema.string({ trim: true }),
    finalidade: schema.string({ trim: true }),
    perguntas: schema.object().anyMembers(),
    urgencia: schema.number([rules.range(1, 3)]),
  })

  public messages = {
    'required': 'Digite um {{field}}',
    'urgencia.range': 'Insira estrelas de 1 a 3',
    'string': 'O campo {{field}} deve ser uma string',
    'number': 'O campo {{field}} deve ser um inteiro',
  }
}
export class FormularioValidatorUpdate {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    titulo: schema.string.optional({ trim: true }),
    tipo: schema.string.optional({ trim: true }),
    finalidade: schema.string.optional({ trim: true }),
    perguntas: schema.object.optional().anyMembers(),
    urgencia: schema.number.optional([rules.range(1, 3)]),
  })

  public messages = {
    'urgencia.range': 'Insira estrelas de 1 a 3',
    'string': 'O campo {{field}} deve ser uma string',
    'number': 'O campo {{field}} deve ser um inteiro',
  }
}
